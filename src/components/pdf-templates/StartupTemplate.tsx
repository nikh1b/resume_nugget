'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const ACCENT = '#0d9488'; // Teal

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333',
    },
    header: {
        marginBottom: 25,
    },
    name: {
        fontSize: 32,
        fontFamily: 'Helvetica-Bold',
        color: '#111',
        marginBottom: 5,
    },
    role: {
        fontSize: 14,
        color: ACCENT,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 10,
    },
    contact: {
        fontSize: 9,
        color: '#666',
        marginBottom: 2,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: ACCENT,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 12,
    },
    section: {
        marginBottom: 20,
    },
    entry: {
        marginBottom: 12,
        paddingLeft: 10,
        borderLeftWidth: 2,
        borderLeftColor: '#eee',
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#222',
    },
    entryDate: {
        fontSize: 9,
        color: '#888',
    },
    entrySubtitle: {
        fontSize: 10,
        color: '#555',
        marginBottom: 4,
    },
    desc: {
        fontSize: 9.5,
        lineHeight: 1.5,
        color: '#444',
    },
    skillTag: {
        backgroundColor: '#e6fffa',
        color: ACCENT,
        padding: '4 8',
        borderRadius: 12,
        fontSize: 9,
        marginRight: 6,
        marginBottom: 6,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

interface TemplateProps {
    resume: Resume;
}

export const StartupTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
                    {/* Assuming first experience is current role for tagline */}
                    <Text style={styles.role}>
                        {experience[0]?.position || 'Professional'}
                    </Text>
                    <Text style={styles.contact}>
                        {personalInfo.email} • {personalInfo.phone} • {personalInfo.address}
                    </Text>
                    {personalInfo.linkedin && <Text style={styles.contact}>{personalInfo.linkedin}</Text>}
                </View>

                {personalInfo.summary && (
                    <View style={styles.section}>
                        <Text style={styles.desc}>{personalInfo.summary}</Text>
                        <View style={styles.divider} />
                    </View>
                )}

                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Skills</Text>
                        <View style={styles.skillsContainer}>
                            {skills.map((skill, i) => (
                                <Text key={i} style={styles.skillTag}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Work History</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{exp.position}</Text>
                                    <Text style={styles.entryDate}>{exp.startDate} — {exp.current ? 'Now' : exp.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{exp.company}</Text>
                                <Text style={styles.desc}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{proj.name}</Text>
                                    {proj.link && <Text style={{ fontSize: 9 }}>View ↗</Text>}
                                </View>
                                <Text style={styles.desc}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.entryHeader}>
                                    <Text style={styles.entryTitle}>{edu.institution}</Text>
                                    <Text style={styles.entryDate}>{edu.startDate} — {edu.endDate}</Text>
                                </View>
                                <Text style={styles.entrySubtitle}>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
