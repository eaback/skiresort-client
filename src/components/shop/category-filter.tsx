'use client';

import { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState<string[]>([]);
    const currentCategory = searchParams.get('category') || '';

    useEffect(() => {
        setCategories([
        'Helmets',
        'Back Protectors',
        'Skis',
        'Snowboards',
        'Ski Poles',
        'Ski Jackets',
        'Ski Pants'
        ]);
    }, []);

    const handleCategoryClick = (category: string) => {
        if (category === currentCategory) {
        router.push('/butik');
        } else {
        router.push(`/butik?category=${encodeURIComponent(category)}`);
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Kategorier</h2>
        
        <div className="flex flex-col gap-2">
            <Button 
            variant={!currentCategory ? "solid" : "light"}
            color={!currentCategory ? "warning" : "default"}
            className="justify-start"
            onPress={() => router.push('/butik')}
            >
            Alla Produkter
            </Button>
            
            {categories.map((category) => (
            <Button
                key={category}
                variant={currentCategory === category ? "solid" : "light"}
                color={currentCategory === category ? "warning" : "default"}
                className="justify-start"
                onPress={() => handleCategoryClick(category)}
            >
                {category}
            </Button>
            ))}
        </div>
        </div>
    );
}
