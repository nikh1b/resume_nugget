'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const ACCENT = '#7c3aed';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        color: '#1e1e2e',
        padding: 0,
    },
    // Top banner
    banner: {
        backgroundColor: '#7c3aed',
        paddingHorizontal: 36,
        paddingVertical: 28,
        color: '#fff',
    },
    name: {
        fontSize: 26,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 1,
        marginBottom: 6,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        fontSize: 8.5,
        color: '#e9d5ff',
    },
    summaryBanner: {
        fontSize: 9,
        color: '#f5f3ff',
        lineHeight: 1.5,
        marginTop: 10,
    },
    // Body
    body: {
        padding: 36,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: ACCENT,
        marginBottom: 8,
        marginTop: 14,
        paddingBottom: 4,
        borderBottomWidth: 1.5,
        borderBottomColor: '#e9d5ff',
    },
    entryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#1e1e2e',
    },
    entryDate: {
        fontSize: 8,
        color: '#6b7280',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    entrySubtitle: {
        fontFamily: 'Helvetica-Oblique',
        fontSize: 9,
        color: '#6b7280',
        marginBottom: 3,
    },
    entryDesc: {
        fontSize: 9,
        color: '#4b5563',
        lineHeight: 1.5,
        marginBottom: 10,
    },
    // Two-column for skills + education
    twoCol: {
        flexDirection: 'row',
        gap: 24,
        marginTop: 14,
    },
    col: {
        flex: 1,
    },
    skillsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    skillChip: {
        backgroundColor: '#f5f3ff',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        fontSize: 8.5,
        color: ACCENT,
        borderWidth: 0.5,
        borderColor: '#ddd6fe',
    },
    techRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
        marginBottom: 10,
    },
    techChip: {
        backgroundColor: '#faf5ff',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 7.5,
        color: '#7c3aed',
        borderWidth: 0.5,
        borderColor: '#e9d5ff',
    },
    link: {
        color: ACCENT,
        fontSize: 8,
        textDecoration: 'none',
    },
});

interface CreativeTemplateProps {
    resume: Resume;
}

export const CreativeTemplate = ({ resume }: CreativeTemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Banner */}
                <View style={styles.banner}>
                    <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
                    <View style={styles.contactRow}>
                        {personalInfo.email && <Text>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text>• {personalInfo.phone}</Text>}
                        {personalInfo.address && <Text>• {personalInfo.address}</Text>}
                        {personalInfo.linkedin && <Text>• {personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text>• {personalInfo.website}</Text>}
                    </View>
                    {personalInfo.summary && (
                        <Text style={styles.summaryBanner}>{personalInfo.summary}</Text>
                    )}
                </View>

                <View style={styles.body}>
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
                                    {exp.description && <Text style={styles.entryDesc}>{exp.description}</Text>}
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
                                        <Text style={styles.entryTitle}>{proj.name}</Text>
                                        {proj.link && (
                                            <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={styles.link}>
                                                Link ↗
                                            </Link>
                                        )}
                                    </View>
                                    {proj.description && <Text style={styles.entryDesc}>{proj.description}</Text>}
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

                    {/* Bottom 2-column: Skills + Education */}
                    <View style={styles.twoCol}>
                        {skills.length > 0 && (
                            <View style={styles.col}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View style={styles.skillsWrap}>
                                    {skills.map((skill, i) => (
                                        <Text key={i} style={styles.skillChip}>{skill}</Text>
                                    ))}
                                </View>
                            </View>
                        )}
                        {education.length > 0 && (
                            <View style={styles.col}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {education.map((edu, i) => (
                                    <View key={i} style={{ marginBottom: 8 }}>
                                        <Text style={styles.entryTitle}>{edu.institution}</Text>
                                        <Text style={styles.entrySubtitle}>
                                            {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                        </Text>
                                        <Text style={{ fontSize: 7.5, color: '#9ca3af' }}>
                                            {edu.startDate} — {edu.endDate}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
