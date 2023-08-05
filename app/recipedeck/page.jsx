'use client';

import { useStoreContext } from '../Context/store'
import { useState } from 'react';
import Recipes from '../components/Recipes'

// const handleComment = async () => {
//     const data = await fetch('/api/comment', {
//         method: 'POST',
//         body: JSON.stringify({
//             comment: comment
//         })
//     })
// }

function recipedeck() {
    return (
        <Recipes />
    )
}

export default recipedeck