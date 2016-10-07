"use strict"

const Hapi = require('hapi');
const configs = require('./config/config.js');
const server = new Hapi.Server();
const Joi = require('joi');
const Handler = require('./routehandler/handler.js');

server.connection(configs.server);

var validate = {
  payload : {
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.number(),
    address: Joi.string().max(255),
    friends: Joi.string()
  },
  params : {

  },
  headers: Joi.object({'authorization': Joi.required()})
              .options({ allowUnknown: true })
};

server.route({
    method: 'POST',
    path: '/login',
    handler: Handler.login,
    config: {
      validate: {
        payload: {
          username: validate.payload.username,
          password: validate.payload.password
        }
      }
    }
});

server.route({
    method: 'POST',
    path: '/register',
    handler: Handler.register,
    config: {
      validate: {
        payload: validate.payload,
        headers: validate.headers
      }
    }
});
/*
server.route({
    method: 'GET',
    path: '/task',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("select * from users where is_deleted = ?",["0"], function(data){
              DB.endConnection();
              reply(data);
          });
        }
      });

    }
});

server.route({
    method: 'GET',
    path: '/task/{id}',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("select * from users where is_deleted = 0 and id = ?",[request.params.id],
            function(data){
              DB.endConnection();
              reply(data);
          });
        }
      });

    }
});

server.route({
    method: 'DELETE',
    path: '/task/{id}',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("Delete from users where id = ?",[request.params.id], function(data){
              DB.endConnection();
              reply(data);
          });
        }
      });
    }
});

server.route({
    method: 'POST',
    path: '/task',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("INSERT INTO `my_test_db`.`users` (`name`, `username`, `password`, `email`, `phone`, `address`) VALUES ( ?, ?, ?, ?, ?, ?);",
                                [request.payload.name,request.payload.username,request.payload.password,request.payload.email,request.payload.phone,request.payload.address],
             function(data){
                DB.createFriends(data.insertId,request.payload.friends)
                DB.endConnection();
                reply(data);
              });
        }
      });
    },
    config: {
        validate: {
          payload: validate.payload
        }
    }
});

server.route({
    method: 'PUT',
    path: '/task/{id}',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("UPDATE `users` SET `name` = ?, `username` = ?, `password` = ?, `email` = ?,\
                  `phone` = ?, `address` = ? WHERE `id` = ?;",
                  [request.payload.name, request.payload.username, request.payload.password,
                  request.payload.email, request.payload.phone, request.payload.address, request.params.id],
                  function(data){
                    DB.createFriends(request.params.id, request.payload.friends)
                    DB.endConnection();
                    reply(data);
                  });
        }
      });
    },
    config: {
        validate: {
          payload: validate.payload
        }
    }
});

server.route({
    method: 'GET',
    path: '/friend/{id}/{name?}',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var name = request.params.name ? "users.name = '"+request.params.name+"'" : 'users.name IS Not Null';
          console.log(name)
          var data = DB.findData("SELECT users.name,users.email,users.phone,users.address \
                      FROM `friends` inner join users on(users.id = friends.friend_id) \
                      WHERE friends.user_id = ? and "+name,[request.params.id],
            function(data){
              DB.endConnection();
              reply(data);
          });
        }
      });

    }
});

server.route({
    method: 'DELETE',
    path: '/friend/{id}/{friendId}',
    handler: function (request, reply) {
      if(!request.headers.authorization){
        reply('User Not Logged In.Auth')
      }
      DB.authenticateUser(request.headers.authorization, function (success){
        if(!success){
          reply('Un Authorised Access!');
        }else{
          var data = DB.findData("Delete from friends where user_id = ? and friend_id = ?",
                      [request.params.id,request.params.friendId],
                      function(data){
                        DB.endConnection();
                        reply(data);
                      });
        }
      });
    }
});
*/
server.start(function(err){

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
