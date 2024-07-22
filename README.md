# Password Strength Checker

A simple web application to check the strength of passwords.

## Password Strength Checker Algorithm

```
function calculatePasswordStrength(P):
    n = length(P)  // Length of the password
    T = {lowercase, uppercase, numbers, special}  // Set of character types
    C = set of common passwords  // Set of known common passwords

    // Define weights for scoring components
    W_common = 40  // Weight for common password check
    W_distribution = 20  // Weight for statistical distribution check
    W_entropy = 40  // Weight for entropy score

    // Initialize scores for each component
    score_common = 0  // Score for common password check
    score_distribution = 0  // Score for statistical distribution check
    score_entropy = 0  // Score for entropy calculation

    // Check minimum length requirement
    if n < 16:
        return 0  // Score 0 if password length is less than 16 characters

    // Check if the password is in the common password list
    if P ∈ C:
        score_common = 0  // Score 0 if password is common
    else:
        score_common = W_common  // Assign full weight if not common

    // Calculate frequency of each character type in the password
    for each character c in P:
        determine character type t ∈ T  // Identify the character type
        F_t = frequency of t in P  // Count occurrences of each character type

    // Calculate statistical distribution of character types
    σ = standard deviation of F_t for all t ∈ T  // Measure of variability in character type frequencies
    if σ ≤ 0.2:
        score_distribution = W_distribution  // Full weight for good statistical distribution

    // Calculate entropy of the password
    R = total number of possible characters  // Total characters available for use in the password
    E = log₂(R^n)  // Calculate entropy based on character set size and password length
    entropy_score = (E / log₂(R^16)) * W_entropy / 80  // Normalize entropy score to weight

    // Calculate final score by summing the weighted scores
    final_score = score_common + score_distribution + entropy_score
    return clamp(final_score, 0, 100)  // Clamp score between 0 and 100
```


## Installation

To install the project, clone the repository and run:

```bash
npm install
```

## TODO: Integrate the workflows in project
- Experimentation and including a fully automated workflow integrated into the project.
- Start from todolist.yml with github worflow to manually trigger and generate branches, issues, todos list
- Auto assigned issue label
- Auto create and sync Project and reflect repository progress changes
- Auto update, readme, wiki, changelogs
- Auto close the issues on todos completion and and branches on merge
- Increment manjor.minor.patch based on todos, issue, branch completion


## Recent Changes
c09644b chore: Update GitHub Actions workflow to use latest version of actions/github-script
