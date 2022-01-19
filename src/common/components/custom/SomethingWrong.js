import React from 'react';

const SomethingWrong = (props) => {
    const { error } = props;
    return <div role="alert">
        <p>Something went wrong : </p>
        <pre>{error.message}</pre>
    </div>;
};

export default SomethingWrong;
