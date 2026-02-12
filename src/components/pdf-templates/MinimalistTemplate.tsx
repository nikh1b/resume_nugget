'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333',
        lineHeight: 1.6,
    },
    header: {
        marginBottom: 30,
        textAlign: 'center',
    },
    name: {
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
        color: '#000',
        marginBottom: 8,
        letterSpacing: 1,
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 15,
        fontSize: 9,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
    },
    section: {
        marginBottom: 20,
    },
    entryContainer: {
        marginBottom: 12,
    },
    entryTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10.5,
        color: '#000',
    },
    entryDate: {
        fontSize: 9,
        color: '#888',
    },
    entrySubtitle: {
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#444',
        marginBottom: 4,
    },
    entryDesc: {
        fontSize: 9.5,
        color: '#555',
        textAlign: 'justify',
    },
    summary: {
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 20,
        color: '#444',
    },
    skillsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    skillItem: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        fontSize: 9,
        color: '#333',
    },
    link: {
        color: '#333',
        textDecoration: 'none',
        borderBottom: '1px solid #999',
    },
});

interface TemplateProps {
    resume: Resume;
}

export const MinimalistTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName || 'YOUR NAME'}</Text>
                    <View style={styles.contactRow}>
                        {personalInfo.email && <Text>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                        {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text>{personalInfo.website}</Text>}
                        {personalInfo.address && <Text>{personalInfo.address}</Text>}
                    </View>
                </View>

                {personalInfo.summary && (
                    <Text style={styles.summary}>{personalInfo.summary}</Text>
                )}

                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsRow}>
                            {skills.map((skill, i) => (
                                <Text key={i} style={styles.skillItem}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryTitleRow}>
                                    <Text style={styles.entryTitle}>{exp.position}</Text>
                                    <Text style={styles.entryDate}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                                {exp.description && <Text style={styles.entryDesc}>{exp.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryTitleRow}>
                                    <Text style={styles.entryTitle}>{proj.name}</Text>
                                    {proj.link && (
                                        <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={styles.link}>
                                            View Project
                                        </Link>
                                    )}
                                </View>
                                {proj.description && <Text style={styles.entryDesc}>{proj.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entryContainer}>
                                <View style={styles.entryTitleRow}>
                                    <Text style={styles.entryTitle}>{edu.institution}</Text>
                                    <Text style={styles.entryDate}>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</Text>
                                {edu.description && <Text style={styles.entryDesc}>{edu.description}</Text>}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
