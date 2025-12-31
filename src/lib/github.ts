
export interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    topics: string[];
    language: string;
    fork: boolean;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    githubLink: string;
}

export async function getProjects(username: string = 'kiranragi'): Promise<Project[]> {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=owner`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!res.ok) {
            console.error('Failed to fetch projects from GitHub:', res.statusText);
            return [];
        }

        const repos: Repo[] = await res.json();

        return repos
            .filter(repo => !repo.fork && repo.description) // Filter out forks and repos without description
            .slice(0, 3) // Take top 3
            .map(repo => ({
                title: repo.name.replace(/[-_]/g, ' '),
                description: repo.description,
                tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean) as string[],
                link: repo.homepage || repo.html_url,
                githubLink: repo.html_url
            }));
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}
