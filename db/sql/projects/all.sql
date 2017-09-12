WITH stages AS (
  SELECT 
    s.proj_desc,
    s.proj_name,
    s.proj_start,
    s.proj_type
  FROM projects p
    LEFT JOIN projects s ON p.id = s.parent_id
  WHERE s.proj_type = 'stage'
),

species AS (
  SELECT 
    projects.id,
    projects.proj_name,
    species.species_name,
    species.common_name
  FROM projects
    INNER JOIN project_species ON projects.id = project_species.project_id
    INNER JOIN species ON project_species.species_id = species.id 
),

leads AS (
  SELECT 
    projects.id,
    projects.proj_name,
    project_users.type,
    users.first_name
  FROM projects
    INNER JOIN project_users ON projects.id = project_users.project_id
    INNER JOIN users ON project_users.user_id = users.id
  WHERE project_users.type = 'lead'
),

colabs AS (
  SELECT 
    projects.id,
    projects.proj_name,
    project_users.type,
    users.first_name
  FROM projects
    INNER JOIN project_users ON projects.id = project_users.project_id
    INNER JOIN users ON project_users.user_id = users.id
  WHERE project_users.type = 'colab'
),

srl AS (
  SELECT 
    id,
    proj_name,
    proj_desc,
    proj_type,
    proj_start,
    proj_duration,
    time_frame,
    (
      SELECT to_jsonb(array_agg(to_jsonb(s)))
      FROM (
        SELECT * 
        FROM stages
        WHERE id = projects.id
      ) s
    ) AS Stages,
    
    (
      SELECT to_jsonb(array_agg(to_jsonb(species)))
      FROM species
      WHERE id = projects.id
    ) AS Species,

    (
      SELECT to_jsonb(array_agg(to_jsonb(leads)))
      FROM leads
      WHERE id = projects.id
    ) AS Leads,

    (
      SELECT to_jsonb(array_agg(to_jsonb(colabs)))
      FROM colabs
      WHERE id = projects.id
    ) AS Colabs
    
  FROM projects
  WHERE projects.proj_type = 'project'
  ORDER BY projects.id
)

-- SELECT to_jsonb(array_agg(to_jsonb(srl)))
SELECT *
FROM srl