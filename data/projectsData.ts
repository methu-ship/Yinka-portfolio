interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: 'Goignore',
    description: `goignore is a lightweight Command Line Interface (CLI) tool for generating .gitignore files based on the programming language you're using. It helps you easily create .gitignore files for your projects by either specifying a programming language or automatically detecting it from the files in your project directory.`,
    imgSrc: '/static/images/goignore.png',
    href: 'https://github.com/hacktivist123/goignore',
  },
  {
    title: 'DevOps Learning Plan',
    description: `This is my DevOps learning plan for the year 2024, it consists of both paid courses and free courses, pick as you wish and create your own learning plan.`,
    imgSrc: '/static/images/devops-learning-plan.png',
    href: 'https://github.com/hacktivist123/DevOps-Learning-Plan',
  },
  {
    title: 'DevOps Project',
    description: `This website runs inside its own Docker container, behind a Traefik reverse proxy with a Docker provider, with an automatic TLS certificate from Let's Encrypt, deployed via GitLab CI/CD, to a server managed with Ansible.`,
    imgSrc: '/static/images/devops-project.gif',
    href: 'https://github.com/hacktivist123/devops-project.top?tab=readme-ov-file',
  },
]

export default projectsData
