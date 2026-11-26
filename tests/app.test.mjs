import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

// Test 1: Production build exists
test('Production build exists', () => {
    assert.ok(existsSync('dist/index.html'));
});

// Test 2: Website loads successfully
test('Website loads successfully', async () => {
    const response = await fetch(BASE_URL);

    assert.equal(response.status, 200);
    assert.ok(
        response.headers.get('content-type').includes('text/html')
    );
});

// Test 3: Products API returns valid data
test('Products API works', async () => {
    const response = await fetch(`${BASE_URL}/api/products`);

    assert.equal(response.status, 200);

    const products = await response.json();
    assert.ok(Array.isArray(products));
});