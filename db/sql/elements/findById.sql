WITH biometric AS (
  SElECT * FROM biometrics
),

vitals AS (
  SELECT * FROM vitals
),

injuries AS (
  SELECT * FROM injuries
),

samples AS (
  SELECT * FROM samples
),

labids AS (
  SELECT * FROM lab_ids
),

meds AS (
  SElECT * FROM medications
),

mort AS (
  SELECT * FROM mortalities
),

necropsy AS (
  SElECT * FROM necropsies
),

evt AS (
  SELECT 
    events.*,
    (
      SELECT to_jsonb(array_agg(to_jsonb(biometrics)))
      FROM biometrics
      WHERE event_id = events.id
    ) AS "Biometrics",
    (
      SELECT to_jsonb(array_agg(to_jsonb(vitals)))
      FROM vitals
      WHERE event_id = events.id
    ) AS "Vitals",
    (
      SELECT to_jsonb(array_agg(to_jsonb(injuries)))
      FROM injuries
      WHERE event_id = events.id
    ) AS "Injuries",
    (
      SELECT to_jsonb(array_agg(to_jsonb(medications)))
      FROM medications
      WHERE event_id = events.id
    ) AS "Medications",
    (
      SELECT to_jsonb(array_agg(to_jsonb(samples)))
      FROM samples
      WHERE event_id = events.id
    ) AS "Samples",
    (
      SELECT to_jsonb(array_agg(to_jsonb(labids)))
      FROM labids
      WHERE event_id = events.id
    ) AS "LabIds",
    (
      SELECT to_jsonb(mort)
      FROM mort
      WHERE event_id = events.id
    ) AS "Mortality",
    (
      SELECT to_jsonb(necropsy)
      FROM necropsy
      WHERE event_id = events.id
    ) AS "Necropsy"
  FROM events
),

marks AS (
  SELECT * FROM marks
),

devices AS (
  SELECT * FROM deployments
)

-- waddl and idaho will need to be added

SELECT
  elements.animal_id,
  elements.id,
  species.common_name,
  species.species_name,
  elements.sex,
  (
    SELECT to_jsonb(array_agg(to_jsonb(marks)))
    FROM marks
    WHERE element_id = elements.id
  ) AS "Marks",
  (
    SELECT to_jsonb(array_agg(to_jsonb(devices)))
    FROM devices
    WHERE element_id = elements.id
  ) AS "Devices",
  (
    SELECT to_jsonb(array_agg(to_jsonb(evt)))
    FROM evt
    WHERE element_id = elements.id
  ) AS "Encounters"
FROM elements
  INNER JOIN species ON elements.species_id = species.id
WHERE animal_id = ${id};