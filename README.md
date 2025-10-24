React Training Series
=====================

Welcome to my **React Training Series**! This repository is designed for developers looking to learn React in a structured, hands-on way. Each week, I'll guide you through a different concept, building a sample application together.

* * * * *

📌 Prerequisites
----------------

### Node.js

This project requires **Node.js v22**. I recommend using **nvm (Node Version Manager)** to install and manage Node versions.

* * * * *

### Check if NVM is Already Installed

Open your terminal (macOS/Linux) or PowerShell/Command Prompt (Windows) and run:

`nvm --version`

-   If a version number prints (e.g., `0.39.7`), nvm is already installed. ✅

-   If you see a "command not found" error, follow the instructions below to install nvm.

* * * * *

### Installing NVM

#### macOS (with Homebrew)

If you have Homebrew installed:

`brew install nvm`

Then follow the post-install instructions to add nvm to your shell profile (`~/.zshrc`, `~/.bash_profile`, etc.):

`mkdir ~/.nvm
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc
source ~/.zshrc`

#### Linux

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc`

#### Windows

Install **nvm-windows**:

1.  Go to [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases).

2.  Download the `nvm-setup.zip` file.

3.  Install it using the installer and follow the prompts.

4.  Open a new Command Prompt and run:

`nvm version`

* * * * *

### Install Node 22

Once nvm is installed, run:

`nvm install 22
nvm use 22`

Verify your Node version:

`node -v
# Should print: v22.x.x`

* * * * *

🚀 Getting Started
------------------

Clone the repository:

`git clone https://github.com/JaxsonMansouriRF/reactology.git
cd reactology`

Install dependencies:

`npm install`

Start the development server:

`npm run dev`

Open your browser and navigate to `http://localhost:5173` to see the app running.

* * * * *

🌳 Branch Workflow
------------------

For each week of the training, I have created **two branches**:

| Branch | Purpose |
| --- | --- |
| `WeekXStart` | Contains the starting code at the beginning of the lesson. |
| `WeekXEnd` | Contains the completed code after all changes from that week. |

**Example: Week 1**

`# Checkout the starting code for Week 1
git checkout Week1Start

# After completing the lesson, you can view the final code
git checkout Week1End`

This structure allows you to **follow along** step-by-step or review the final solution after each lesson.

* * * * *

📝 Recommended Workflow
-----------------------

1.  Checkout the start branch for the week.

2.  Work through the lesson and make changes locally.

3.  Compare your code to the end branch to see the completed solution.

* * * * *

📚 Topics Covered
-----------------

-   React Components & JSX

-   Props & State

-   React Hooks (useState, useEffect)

-   React Router (v6)

-   Context API

-   Redux (state management)

-   Material-UI (MUI) for styling

* * * * *

⚡ Notes
-------

-   Make sure you are using Node v22 throughout the training.

-   If you encounter dependency issues, delete `node_modules` and run `npm install` again.

-   Use the `WeekXStart` and `WeekXEnd` branches to track your progress each week.

* * * * *
