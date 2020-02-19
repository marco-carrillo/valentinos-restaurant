-- creating tables records

INSERT INTO tables (max_seating) VALUES(4);
INSERT INTO tables (max_seating) VALUES(4);
INSERT INTO tables (max_seating) VALUES(4);
INSERT INTO tables (max_seating) VALUES(3);
INSERT INTO tables (max_seating) VALUES(3);
INSERT INTO tables (max_seating) VALUES(3);
INSERT INTO tables (max_seating) VALUES(3);
INSERT INTO tables (max_seating) VALUES(2);
INSERT INTO tables (max_seating) VALUES(2);
INSERT INTO tables (max_seating) VALUES(2);

-- Creating records for the roles
INSERT INTO roles (role_name, is_admin) VALUES ('Manager',true);
INSERT INTO roles (role_name, is_admin) VALUES ('Server',false);
INSERT INTO roles (role_name, is_admin) VALUES ('Cook',false);

-- Creating records for the meal_type
INSERT INTO meal_type (name, requires_id) VALUES ('Wines',true);
INSERT INTO meal_type (name, requires_id) VALUES ('Coffee',false);
INSERT INTO meal_type (name, requires_id) VALUES ('Water',false);
INSERT INTO meal_type (name, requires_id) VALUES ('Food',false);

-- Creating records for the meals
INSERT INTO meals (name, time_to_prepare, meal_cost,meal_price,meal_incentive,active, meal_type_id)
VALUES ('Pasta-Da-Grande',10,9,99,0,true,4);

INSERT INTO meals (name, time_to_prepare, meal_cost,meal_price,meal_incentive,active, meal_type_id)
VALUES ('London Broil',15,19,125,0,true,4);

INSERT INTO meals (name, time_to_prepare, meal_cost,meal_price,meal_incentive,active, meal_type_id)
VALUES ('Saint-De-Lourev 2001 Red',1,10,250,0,true,1);

INSERT INTO meals (name, time_to_prepare, meal_cost,meal_price,meal_incentive,active, meal_type_id)
VALUES ('Cafe De-Los-Santos Hand-picked',5,1,19,0,true,2);

INSERT INTO meals (name, time_to_prepare, meal_cost,meal_price,meal_incentive,active, meal_type_id)
VALUES ('Spring distilled a-Lav',0,1,19,0,true,3);

-- Creating records for order statuses
INSERT INTO order_status (name, final_status) VALUES ('NEW',false);
INSERT INTO order_status (name, final_status) VALUES ('COOKING',false);
INSERT INTO order_status (name, final_status) VALUES ('READY',false);
INSERT INTO order_status (name, final_status) VALUES ('SERVED',false);
INSERT INTO order_status (name, final_status) VALUES ('REJECTED',true);
INSERT INTO order_status (name, final_status) VALUES ('CLOSED',true);
