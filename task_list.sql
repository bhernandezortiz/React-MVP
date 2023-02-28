DROP TABLE IF EXISTS task_list;
CREATE TABLE task_list(
    id serial,
    task varchar(500) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO task_list (task) VALUES ('study');
INSERT INTO task_list (task) VALUES ('clean room');