/* Replace with your SQL commands */

CREATE TABLE login_history (
    id SERIAL PRIMARY KEY,
    login_date DATE NOT NULL,
    login_time TIME NOT NULL,
    verification_result VARCHAR(10) CHECK (verification_result IN ('Login', 'Logout')),
    user_id integer,
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);