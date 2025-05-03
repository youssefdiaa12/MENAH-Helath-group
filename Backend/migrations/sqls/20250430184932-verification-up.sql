/* Replace with your SQL commands */

create table verifications(
    id serial primary key,
    bottle_id integer,
    baby_band_mrn integer,
    bottle_baby_mrn integer,
    first_nurse integer,
    second_nurse integer,
    isverified boolean DEFAULT false,
    CONSTRAINT fk_bottle
        FOREIGN KEY (bottle_id)
        REFERENCES bottle(order_number) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE ,
    CONSTRAINT fk_first_nurse
        FOREIGN KEY (first_nurse)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE ,
    CONSTRAINT fk_second_nurse
        FOREIGN KEY (second_nurse)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
)