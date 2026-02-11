'use client';

import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const ACCENT = '#2563eb';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        color: '#333',
    },
    // Left sidebar
    sidebar: {
        width: '35%',
        backgroundColor: '#1e293b',
        color: '#e2e8f0',
        padding: 28,
        paddingTop: 36,
    },
    sidebarName: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        color: '#fff',
        marginBottom: 4,
    },
    sidebarLabel: {
        fontSize: 8,
        color: '#94a3b8',
        marginBottom: 16,
    },
    sidebarSection: {
        marginBottom: 18,
    },
    sidebarSectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: ACCENT,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
        paddingBottom: 4,
    },
    sidebarText: {
        fontSize: 8.5,
        color: '#cbd5e1',
        lineHeight: 1.5,
        marginBottom: 3,
    },
    skillChip: {
        backgroundColor: '#334155',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 8,
        fontSize: 8,
        color: '#e2e8f0',
        marginRight: 4,
        marginBottom: 4,
    },
    skillsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // Main content
    main: {
        width: '65%',
        padding: 28,
        paddingTop: 36,
    },
    mainSection: {
        marginBottom: 16,
    },
    mainSectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: '#1e293b',
        marginBottom: 8,
        borderBottomWidth: 1.5,
        borderBottomColor: ACCENT,
        paddingBottom: 4,
    },
    entryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    entryTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#1e293b',
    },
    entryDate: {
        fontSize: 8,
        color: '#64748b',
    },
    entrySubtitle: {
        fontFamily: 'Helvetica-Oblique',
        fontSize: 9,
        color: '#475569',
        marginBottom: 3,
    },
    entryDesc: {
        fontSize: 9,
        color: '#475569',
        lineHeight: 1.5,
        marginBottom: 10,
    },
    techRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 3,
        marginBottom: 10,
    },
    techChip: {
        backgroundColor: '#eff6ff',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 7.5,
        color: ACCENT,
        borderWidth: 0.5,
        borderColor: '#bfdbfe',
    },
    link: {
        color: ACCENT,
        fontSize: 8,
        textDecoration: 'none',
    },
});

interface ModernTemplateProps {
    resume: Resume;
}

export const ModernTemplate = ({ resume }: ModernTemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Sidebar */}
                <View style={styles.sidebar}>
                    <Text style={styles.sidebarName}>{personalInfo.fullName || 'Your Name'}</Text>
                    <Text style={styles.sidebarLabel}>Resume</Text>

                    {/* Contact */}
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarSectionTitle}>Contact</Text>
                        {personalInfo.email && <Text style={styles.sidebarText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.sidebarText}>{personalInfo.phone}</Text>}
                        {personalInfo.address && <Text style={styles.sidebarText}>{personalInfo.address}</Text>}
                        {personalInfo.linkedin && <Text style={styles.sidebarText}>{personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text style={styles.sidebarText}>{personalInfo.website}</Text>}
                    </View>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Skills</Text>
                            <View style={styles.skillsWrap}>
                                {skills.map((skill, i) => (
                                    <Text key={i} style={styles.skillChip}>{skill}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Education in sidebar */}
                    {education.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarSectionTitle}>Education</Text>
                            {education.map((edu, i) => (
                                <View key={i} style={{ marginBottom: 8 }}>
                                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#fff' }}>
                                        {edu.institution}
                                    </Text>
                                    <Text style={styles.sidebarText}>
                                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                    </Text>
                                    <Text style={{ fontSize: 7.5, color: '#94a3b8' }}>
                                        {edu.startDate} — {edu.endDate}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Main */}
                <View style={styles.main}>
                    {/* Summary */}
                    {personalInfo.summary && (
                        <View style={styles.mainSection}>
                            <Text style={styles.mainSectionTitle}>About</Text>
                            <Text style={styles.entryDesc}>{personalInfo.summary}</Text>
                        </View>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <View style={styles.mainSection}>
                            <Text style={styles.mainSectionTitle}>Experience</Text>
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
                        <View style={styles.mainSection}>
                            <Text style={styles.mainSectionTitle}>Projects</Text>
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
                </View>
            </Page>
        </Document>
    );
};
