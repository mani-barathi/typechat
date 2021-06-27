# TypeChat

Developing a Chat App using React, Express and Socket.io

## Setup

### Database

1. Make sure you have Postgres installed in your computer if not install it from [here](https://www.postgresql.org/)
1. Open the Postgres shell(psql) and create a database
   ```shell
       create database typechat;
   ```

### Frontend

1. cd into the client and install all dependencies
   ```shell
      cd client
      yarn
   ```
1. start dev server
   ```shell
       yarn start
   ```

### Backend

1. cd into the server and install all dependencies
   ```shell
      cd server
      yarn
   ```
1. open two terminals and run each of the below commands in seperate terminal

- ```shell
       yarn watch
  ```
- ```shell
       yarn dev
  ```
