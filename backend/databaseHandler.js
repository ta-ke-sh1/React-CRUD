const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const URL = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const DATABASE_NAME = 'MyDatabase';

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function addObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    try {
        await dbo.collection(collectionName).insertOne(objectToInsert);
        console.log('Object Inserted');
    } catch (err) {
        console.log(err);
    }
}

async function deleteObject(collectionName, id) {
    const dbo = await getDB();
    try {
        await dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) });
        console.log('Deleted Object');
    } catch (err) {
        console.log(err);
    }
}

async function updateObject(collectionName, objectToUpdate, values) {
    const dbo = await getDB();
    await dbo.collection(collectionName).updateOne(objectToUpdate, values);
}


async function getByID(collectionName, id) {
    const dbo = await getDB();
    try {
        return await dbo.collection(collectionName).findOne({ _id: ObjectId(id) });
    } catch (err) {
        console.log(err);
    }
}

async function getAll(collectionName) {
    const dbo = await getDB();
    try {
        return await dbo.collection(collectionName).find().toArray();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addObject,
    getAll,
    getByID,
    deleteObject,
    updateObject
}

