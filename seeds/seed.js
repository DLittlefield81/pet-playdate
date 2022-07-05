const { faker } = require('@faker-js/faker');
const { Model } = require('sequelize');
const { User, PlayDate, Pet } = require("../models");
const { sequelize } = require('../models/User');

function createUser() {
    return {
        user_name: faker.name.firstName(),
        email: faker.internet.email(),
        password: "password"
    };
};

function createEvent(id) {
    const time = new Date();
    return {
        date: faker.date.future(),
        time: time.toLocaleTimeString('en-IT', { hour12: false }),
        location: faker.address.city(),
        user_id: id
    }
}

function createDog(id) {
    return {
        pet_name: faker.name.firstName(),
        breed: faker.animal.dog(),
        age: Math.floor(Math.random()*15)+1,
        user_id: id
    }
}

sequelize.sync({ force: false }).then(() => {
    for(let i = 0; i < 10; i++) {
        async function createData() {
            let user = await User.create(createUser());
            let dog1 = await Pet.create(createDog(user.dataValues.id))
            let dog2 = await Pet.create(createDog(user.dataValues.id))
            let event1 = await PlayDate.create(createEvent(user.dataValues.id))
            let event2 = await PlayDate.create(createEvent(user.dataValues.id))
            
            const user1 = await User.findByPk(user.dataValues.id, {
            include:[{model: Pet}, {model: PlayDate}]
            });
            const playDate1 = user1.playdates[user1.playdates.length - 1]
            const playDate2 = user1.playdates[user1.playdates.length - 2]
            for(let i = 0;i < user1.pets.length; i++) {
                await playDate1.addPet(user1.pets[i]);
                await playDate2.addPet(user1.pets[i]);
            }
    }
    createData();
    }
});
