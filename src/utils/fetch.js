import fetch from 'isomorphic-fetch';
import {stringify} from 'query-string';

const FETCH_INIT = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    mode: 'cors',
    redirect: 'manual',
    credentials: 'include'
}

export const fetchData = (
    path,
    args,
    onSuccess,
    onError
) => (
    fetch(`${ path }?${ stringify(args) }`, FETCH_INIT)
        .then(response => {
            if(response.ok) {
                response.json().then(onSuccess)
            } else if (response.type == 'opaqueredirect') {
                window.location.reload()
            } else {
                onError()
            }
        })
        .catch(onError)
)

const POST_INIT = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    redirect: 'manual',
    credentials: 'include',
    method: 'POST'
}

export const postData = (
    path,
    args,
    onSuccess,
    onError
) => {
    let attrs = POST_INIT;
    attrs.body = JSON.stringify(args);
    return (
        fetch(`${ path }`, attrs)
            .then(response => {
                if(response.ok) {
                    response.json().then(onSuccess)
                } else if (response.type == 'opaqueredirect') {
                    window.location.reload()
                } else {
                    onError()
                }
            })
            .catch(onError)
    )
}

const DELETE_INIT = {
    redirect: 'manual',
    credentials: 'include',
    method: 'DELETE'
}

export const deleteData = (
    path,
    onSuccess,
    onError
) => {
    return (
        fetch(`${ path }`, DELETE_INIT)
            .then(response => {
                if(response.ok) {
                    response.json().then(onSuccess)
                } else {
                    onError()
                }
            })
            .catch(onError)
    )
}