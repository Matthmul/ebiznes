import '../componentsStyles/Category.scss';
import { Button } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from "react";
import { categoryHook } from "../hooks/categoryHook";

function Category({setCategory}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryHook.fetchCategories().then((categoriesData) =>
            setCategories(categoriesData)
        );
    }, [])

    return (
        <div className="category">
            <div className="single-category">
                <Button onClick={() => setCategory(-1)}>Wszystko</Button>
            </div>
            {categories.map((category) => (
                <div key={category.id} className="single-category">
                    <Button onClick={() => setCategory(category.id)}>{category.description}</Button>
                </div>
            ))}
        </div>
    )
}

export default Category