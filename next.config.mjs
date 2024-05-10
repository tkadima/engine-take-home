/** @type {import('next').NextConfig} */
import { execSync } from 'child_process';

const nextConfig = {async rewrites() {
    try {
        execSync('node ./utils/seed.mjs', { stdio: 'inherit' });
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1); 
    }
    return [];
},};



export default nextConfig;
