import {get, post, put, del} from './api.js'

const endpoints = {
    catalog: '/data/offers?sortBy=_createdOn%20desc',
    byId: '/data/offers/',
}

export async function getAllOffers(){
    return get(endpoints.catalog);
}

export async function getOneById(id){
    return get(endpoints.byId + id);
}

export async function createOneOffer(data){
    return post(endpoints.catalog, data);
}

export async function updateOneOffer(id, data){
    return put(endpoints.byId + id, data);
}

export async function deleteOneOffer(id){
    return del(endpoints.byId + id);
}