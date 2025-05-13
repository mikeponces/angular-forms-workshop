export interface Registration {
    // Personal Info (Template-driven)
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    // Professional Info (Reactive)
    company: string;
    jobTitle: string;
    yearsExperience: number;
    skills: string[];
    dietaryRequirements?: string;
}