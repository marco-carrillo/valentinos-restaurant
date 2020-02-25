-- creating tables records

INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 1",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 2",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 3",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 4",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 5",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 6",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 7",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 8",false,2,current_timestamp(),current_timestamp());
INSERT INTO tables (name, occupied,max_seating,createdAt,updatedAt) VALUES("Table 9",false,2,current_timestamp(),current_timestamp());

-- Creating records for the roles
INSERT INTO roles (name, is_admin,createdAt,updatedAt) VALUES ('Manager',true,current_timestamp(),current_timestamp());
INSERT INTO roles (name, is_admin,createdAt,updatedAt) VALUES ('Server',false,current_timestamp(),current_timestamp());
INSERT INTO roles (name, is_admin,createdAt,updatedAt) VALUES ('Cook',false,current_timestamp(),current_timestamp());

-- Creating records for the meal_type
INSERT INTO meal_types (name, requires_id,menu_order,createdAt,updatedAt) VALUES ('Main courses',false,1,current_timestamp(),current_timestamp());
INSERT INTO meal_types (name, requires_id,menu_order,createdAt,updatedAt) VALUES ('Wines',true,2,current_timestamp(),current_timestamp());
INSERT INTO meal_types (name, requires_id,menu_order,createdAt,updatedAt) VALUES ('Coffee',false,3,current_timestamp(),current_timestamp());
INSERT INTO meal_types (name, requires_id,menu_order,createdAt,updatedAt) VALUES ('Water',false,4,current_timestamp(),current_timestamp());


-- Creating records for the meals
INSERT INTO meals (name, time_to_prepare, cost,price,incentive,active, meal_type_id,createdAt,updatedAt)
VALUES ('Pasta-Da-Grande',10,9,99,0,true,1,current_timestamp(),current_timestamp());

INSERT INTO meals (name, time_to_prepare, cost,price,incentive,active, meal_type_id,createdAt,updatedAt)
VALUES ('London Broil',15,19,125,0,true,1,current_timestamp(),current_timestamp());

INSERT INTO meals (name, time_to_prepare, cost,price, incentive,active, meal_type_id,createdAt,updatedAt)
VALUES ('Saint-De-Lourev 2001 Red',1,10,250,0,true,2,current_timestamp(),current_timestamp());

INSERT INTO meals (name, time_to_prepare, cost, price, incentive,active, meal_type_id,createdAt,updatedAt)
VALUES ('Cafe De-Los-Santos Hand-picked',5,1,19,0,true,3,current_timestamp(),current_timestamp());

INSERT INTO meals (name, time_to_prepare, cost, price, incentive,active, meal_type_id,createdAt,updatedAt)
VALUES ('Spring distilled a-Lav',0,1,19,0,true,4,current_timestamp(),current_timestamp());

-- Creating records for order statuses
INSERT INTO order_statuses (name, final_status,createdAt,updatedAt) VALUES ('NEW',false,current_timestamp(),current_timestamp());
INSERT INTO order_statuses (name, final_status,createdAt,updatedAt) VALUES ('COOKING',false,current_timestamp(),current_timestamp());
INSERT INTO order_statuses (name, final_status,createdAt,updatedAt) VALUES ('READY',false,current_timestamp(),current_timestamp());
INSERT INTO order_statuses (name, final_status,createdAt,updatedAt) VALUES ('SERVED',false,current_timestamp(),current_timestamp());
INSERT INTO order_statuses (name, final_status,createdAt,updatedAt) VALUES ('CLOSED',true,current_timestamp(),current_timestamp());

