import fetch from 'isomorphic-fetch';
import {stringify} from 'query-string';

const FETCH_INIT = {
    headers: { 'Content-Type': 'application/json' },
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
