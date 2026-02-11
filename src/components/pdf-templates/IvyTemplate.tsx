'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        fontSize: 10,
        color: '#333',
        lineHeight: 1.4,
    },
    // Header
    header: {
        borderBottomWidth: 2,
        borderBottomColor: '#1a1a1a',
        paddingBottom: 12,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#1a1a1a',
        marginBottom: 6,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 9,
        color: '#555',
    },
    summary: {
        marginTop: 8,
        fontSize: 9.5,
        color: '#444',
        lineHeight: 1.5,
        textAlign: 'justify',
    },
    // Section
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 3,
        marginBottom: 8,
        marginTop: 14,
        color: '#1a1a1a',
    },
    // Experience / Education rows
    entryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontFamily: 'Times-Bold',
        fontSize: 10.5,
        color: '#1a1a1a',
    },
    entryDate: {
        fontSize: 9,
        color: '#777',
    },
    entrySubtitle: {
        fontFamily: 'Times-Italic',
        fontSize: 10,
        color: '#555',
        marginBottom: 3,
    },
    entryDescription: {
        fontSize: 9.5,
        color: '#444',
        lineHeight: 1.5,
        marginBottom: 8,
    },
    // Skills
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillChip: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        fontSize: 9,
        color: '#444',
    },
    // Projects
    techRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 3,
        marginBottom: 8,
    },
    techChip: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 8,
        color: '#555',
        borderWidth: 0.5,
        borderColor: '#ddd',
    },
    link: {
        color: '#2563eb',
        fontSize: 8,
        textDecoration: 'none',
    },
});

interface IvyTemplateProps {
    resume: Resume;
}

export const IvyTemplate = ({ resume }: IvyTemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
                    <View style={styles.contactRow}>
                        {personalInfo.email && <Text>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text>| {personalInfo.phone}</Text>}
                        {personalInfo.address && <Text>| {personalInfo.address}</Text>}
                        {personalInfo.linkedin && <Text>| {personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text>| {personalInfo.website}</Text>}
                    </View>
                    {personalInfo.summary && (
                        <Text style={styles.summary}>{personalInfo.summary}</Text>
                    )}
                </View>

                {/* Experience */}
                {experience.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, i) => (
                            <View key={i}>
                                <View style={styles.entryRow}>
                                    <Text style={styles.entryTitle}>{exp.position}</Text>
                                    <Text style={styles.entryDate}>
                                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                    </Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                                {exp.description && (
                                    <Text style={styles.entryDescription}>{exp.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i}>
                                <View style={styles.entryRow}>
                                    <Text style={styles.entryTitle}>{edu.institution}</Text>
                                    <Text style={styles.entryDate}>
                                        {edu.startDate} — {edu.endDate}
                                    </Text>
                                </View>
                                <Text style={styles.entrySubtitle}>
                                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                </Text>
                                {edu.description && (
                                    <Text style={styles.entryDescription}>{edu.description}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i}>
                                <View style={styles.entryRow}>
                                    <Text style={styles.entryTitle}>
                                        {proj.name}
                                    </Text>
                                    {proj.link && (
                                        <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={styles.link}>
                                            {proj.link}
                                        </Link>
                                    )}
                                </View>
                                {proj.description && (
                                    <Text style={styles.entryDescription}>{proj.description}</Text>
                                )}
                                {proj.technologies.length > 0 && (
                                    <View style={styles.techRow}>
                                        {proj.technologies.map((tech, j) => (
                                            <Text key={j} style={styles.techChip}>{tech}</Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsRow}>
                            {skills.map((skill, i) => (
                                <Text key={i} style={styles.skillChip}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};
