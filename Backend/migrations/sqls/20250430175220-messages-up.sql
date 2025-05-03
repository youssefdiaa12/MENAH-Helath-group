CREATE TABLE messages (
    id serial PRIMARY KEY,
    subject varchar(100),
    body text,
    sender_id integer,
    recipient_id integer,
    CONSTRAINT fk_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE,
    CONSTRAINT fk_recipient
        FOREIGN KEY (recipient_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);
