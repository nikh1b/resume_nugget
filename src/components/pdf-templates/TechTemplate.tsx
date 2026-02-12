'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const styles = StyleSheet.create({
    page: {
        padding: 35,
        fontFamily: 'Courier',
        fontSize: 10,
        backgroundColor: '#fff',
        color: '#222',
        lineHeight: 1.4,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Courier-Bold',
        marginBottom: 8,
    },
    contact: {
        fontSize: 9,
        fontFamily: 'Courier-Oblique',
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Courier-Bold',
        marginBottom: 10,
        marginTop: 15,
        textDecoration: 'underline',
    },
    entry: {
        marginBottom: 12,
    },
    entryHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    jobTitle: {
        fontFamily: 'Courier-Bold',
    },
    date: {
        fontSize: 9,
    },
    company: {
        fontSize: 9,
    },
    codeBlock: {
        marginTop: 5,
        fontSize: 9,
        marginLeft: 10,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
    },
    skills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontFamily: 'Courier-Bold',
        fontSize: 9,
    },
    skillItem: {
        marginRight: 10,
    },
});

interface TemplateProps {
    resume: Resume;
}

export const TechTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{`> ${personalInfo.fullName || 'User'}`}</Text>
                    <Text style={styles.contact}>
                        {`{ email: "${personalInfo.email}", phone: "${personalInfo.phone}" }`}
                    </Text>
                    {personalInfo.linkedin && (
                        <Text style={styles.contact}>{`// ${personalInfo.linkedin}`}</Text>
                    )}
                </View>

                {personalInfo.summary && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>01_SUMMARY</Text>
                        <Text style={styles.codeBlock}>{personalInfo.summary}</Text>
                    </View>
                )}

                {skills.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>02_SKILLS</Text>
                        <View style={styles.codeBlock}>
                            <Text style={styles.skills}>
                                {`[ "${skills.join('", "')}" ]`}
                            </Text>
                        </View>
                    </View>
                )}

                {experience.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>03_EXPERIENCE</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHead}>
                                    <Text style={styles.jobTitle}>{exp.position}</Text>
                                    <Text style={styles.date}>{`<${exp.startDate} - ${exp.current ? 'Now' : exp.endDate}>`}</Text>
                                </View>
                                <Text style={styles.company}>@ {exp.company}</Text>
                                <Text style={styles.codeBlock}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {projects.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>04_PROJECTS</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHead}>
                                    <Text style={styles.jobTitle}>{proj.name}</Text>
                                    {proj.link && <Text style={styles.date}>{proj.link}</Text>}
                                </View>
                                <Text style={styles.codeBlock}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {education.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>05_EDUCATION</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHead}>
                                    <Text style={styles.jobTitle}>{edu.institution}</Text>
                                    <Text style={styles.date}>{edu.endDate}</Text>
                                </View>
                                <Text style={styles.company}>{edu.degree} in {edu.fieldOfStudy}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
