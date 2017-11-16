WITH species AS (
  SELECT 
    projects.id,
    species.species_name,
    species.common_name
  FROM projects
    INNER JOIN project_species ON projects.id = project_species.project_id
    INNER JOIN species ON project_species.species_id = species.id 
),

hu AS (
  SELECT 
    projects.id,
    project_locations.hunt_unit
  FROM projects
    INNER JOIN project_locations ON projects.id = project_locations.project_id
),

srl AS (
  SELECT 
    id,
    proj_name,
    proj_desc,
    proj_start,
    (
      SELECT to_jsonb(array_agg(to_jsonb(species)))
      FROM species
      WHERE id = projects.id
    ) AS Species,
    (
      SELECT to_jsonb(array_agg(to_jsonb(hu)))
      FROM hu
      WHERE id = projects.id
    ) AS Locations
  FROM projects
  ORDER BY projects.id
)

SELECT *
FROM srl