/* Replace with your SQL commands */

create table bottleUsage(
    id serial primary key,
    total_volume NUMERIC(10, 2) NOT NULL,
    total_volume_used NUMERIC(10, 2) NOT NULL,
    total_volume_discarded NUMERIC(10, 2) NOT NULL,
    date_of_usage date,
    bottle_id integer,
    CONSTRAINT fk_bottle
        FOREIGN KEY (bottle_id)
        REFERENCES bottle(order_number) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);