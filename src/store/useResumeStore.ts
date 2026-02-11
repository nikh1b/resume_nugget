import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Resume } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid'; // We need uuid for generating IDs

interface ResumeState {
    resume: Resume;
    _hasUnsavedChanges: boolean;
    // Actions
    setResume: (resume: Resume) => void;
    markAsSaved: () => void;
    updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
    // Template
    selectedTemplate: 'ivy' | 'modern' | 'creative';
    setTemplate: (template: 'ivy' | 'modern' | 'creative') => void;

    // Education
    addEducation: () => void;
    removeEducation: (index: number) => void;
    updateEducation: (index: number, education: Partial<Resume['education'][0]>) => void;

    // Experience
    addExperience: () => void;
    removeExperience: (index: number) => void;
    updateExperience: (index: number, experience: Partial<Resume['experience'][0]>) => void;

    // Skills
    addSkill: (skill: string) => void;
    removeSkill: (index: number) => void;

    // Projects
    addProject: () => void;
    removeProject: (index: number) => void;
    updateProject: (index: number, project: Partial<Resume['projects'][0]>) => void;
}

const initialResume: Resume = {
    id: '',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
};

const initialTemplate: 'ivy' | 'modern' | 'creative' = 'ivy';

export const useResumeStore = create<ResumeState>()(
    persist(
        immer((set) => ({
            resume: initialResume,
            _hasUnsavedChanges: false,
            selectedTemplate: initialTemplate,

            setTemplate: (template) =>
                set((state) => {
                    state.selectedTemplate = template;
                }),

            setResume: (resume) =>
                set((state) => {
                    state.resume = resume;
                }),

            updatePersonalInfo: (info) =>
                set((state) => {
                    Object.assign(state.resume.personalInfo, info);
                    state._hasUnsavedChanges = true;
                }),

            addEducation: () =>
                set((state) => {
                    state.resume.education.push({
                        id: uuidv4(),
                        institution: '',
                        degree: '',
                        fieldOfStudy: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                    });
                    state._hasUnsavedChanges = true;
                }),

            removeEducation: (index) =>
                set((state) => {
                    state.resume.education.splice(index, 1);
                    state._hasUnsavedChanges = true;
                }),

            updateEducation: (index, education) =>
                set((state) => {
                    Object.assign(state.resume.education[index], education);
                    state._hasUnsavedChanges = true;
                }),

            addExperience: () =>
                set((state) => {
                    state.resume.experience.push({
                        id: uuidv4(),
                        company: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                        description: '',
                    });
                    state._hasUnsavedChanges = true;
                }),

            removeExperience: (index) =>
                set((state) => {
                    state.resume.experience.splice(index, 1);
                    state._hasUnsavedChanges = true;
                }),

            updateExperience: (index, experience) =>
                set((state) => {
                    Object.assign(state.resume.experience[index], experience);
                    state._hasUnsavedChanges = true;
                }),

            addSkill: (skill) =>
                set((state) => {
                    if (!state.resume.skills.includes(skill)) {
                        state.resume.skills.push(skill);
                        state._hasUnsavedChanges = true;
                    }
                }),

            removeSkill: (index) =>
                set((state) => {
                    state.resume.skills.splice(index, 1);
                    state._hasUnsavedChanges = true;
                }),

            addProject: () =>
                set((state) => {
                    state.resume.projects.push({
                        id: uuidv4(),
                        name: '',
                        description: '',
                        technologies: [],
                        link: '',
                    });
                    state._hasUnsavedChanges = true;
                }),

            removeProject: (index) =>
                set((state) => {
                    state.resume.projects.splice(index, 1);
                    state._hasUnsavedChanges = true;
                }),

            updateProject: (index, project) =>
                set((state) => {
                    Object.assign(state.resume.projects[index], project);
                    state._hasUnsavedChanges = true;
                }),
            markAsSaved: () =>
                set((state) => {
                    state._hasUnsavedChanges = false;
                }),
        })),
        {
            name: 'resume-storage', // name of the item in the storage (must be unique)
            partialize: (state) => ({ resume: state.resume }), // Only persist the resume data, not UI flags
        }
    )
);
