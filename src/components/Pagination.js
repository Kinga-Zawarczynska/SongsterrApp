import React, { useState } from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

 
        return (
            <nav>
                <div className="pagination">
                    {pageNumbers.map(number => (
                        <div key={number} className="pageItem">
                            <button
                                tabIndex={-1}
                                onClick={() => {
                                    paginate(number)
                                }}
                                className="regularButton"
                            >
                                {number}
                            </button>
                        </div>
                    ))}
                </div>
            </nav>
        );
    }
   
