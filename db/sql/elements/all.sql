SELECT
elements.id,
species.common_name AS species,
elements.animal_id AS ndow_id,
events.event_date AS date,
projects.proj_name AS project,
12 AS hunt_unit,
events.status,
elements.sex,
events.age,
events.comments,
species.grouping,
(
  SELECT to_jsonb(array_agg(to_jsonb(m)))
  FROM (
    SELECT mark_id, mark_color, mark_type, mark_location, date_given, date_removed
    FROM marks
    WHERE element_id = elements.id
  ) m
) AS "marks",
(
  SELECT to_jsonb(array_agg(to_jsonb(d)))
  FROM (
    SELECT serial_num, frequency, type, inservice, outservice
    FROM deployments
    WHERE element_id = elements.id
  ) d
) AS "devices",
(
  SELECT to_jsonb(array_agg(lab_id))
  FROM lab_ids
  WHERE event_id = events.id
) AS "labids"
-- (qaqc)
-- locs)
FROM elements
  INNER JOIN species ON elements.species_id = species.id
  LEFT JOIN events ON elements.id = events.element_id
  LEFT JOIN projects ON events.project_id = projects.id;
