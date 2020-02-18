import React from 'react';

function Card(props) {
    const { id, title, name, tabs } = props;
    return (
        <div key={id} className="card">
            <div  className="main">
                <div>{title}</div>
                <div>{name}</div>

                <div className="Tabs">
                    {tabs}
                </div>


            </div>
        </div>

    )
}

export default Card;
