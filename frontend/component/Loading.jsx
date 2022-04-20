import React from 'react'

export const Loading = () => {


    return (
        <div className="mt-5 d-flex justify-content-center">
            <button className="btn btn-dark" type="button" disabled>
                <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
                <span className="visually-hidden">Loading...</span>
            </button>
        </div>
    )
}