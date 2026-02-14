
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// SaaS: Modern startup aesthetic, muted blues/grays, very clean
const styles = StyleSheet.create({
    page: { padding: 35, fontFamily: 'Helvetica', fontSize: 9.5, color: '#334155' },
    header: { marginBottom: 25 },
    name: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: '#0f172a', marginBottom: 6 },
    tagline: { fontSize: 10, color: '#64748b', marginBottom: 12 },

    contactRow: { flexDirection: 'row', gap: 15, fontSize: 8.5, color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: 12 },

    section: { marginBottom: 18 },
    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#3b82f6', // blue-500
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8
    },

    card: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 4, marginBottom: 8 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    cardTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#1e293b' },
    cardSubtitle: { fontSize: 9, color: '#3b82f6' },
    cardDate: { fontSize: 8, color: '#94a3b8' },

    skillBadge: { backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3 6', borderRadius: 3, marginRight: 4, fontSize: 8 }
});

export const SaaSTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.tagline}>Forward-thinking professional building scalable solutions.</Text>
                <View style={styles.contactRow}>
                    <Text>{resume.personalInfo.email}</Text>
                    <Text>{resume.personalInfo.phone}</Text>
                    <Text>{resume.personalInfo.address}</Text>
                    {resume.personalInfo.linkedin && <Text>Li: {resume.personalInfo.linkedin}</Text>}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.cardTitle}>{exp.position}</Text>
                                <Text style={styles.cardSubtitle}>{exp.company}</Text>
                            </View>
                            <Text style={styles.cardDate}>{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</Text>
                        </View>
                        <Text style={{ lineHeight: 1.4 }}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={{ flexDirection: 'row', gap: 15 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Projects</Text>
                        {resume.projects.map((proj, i) => (
                            <View key={i} style={styles.card}>
                                <Text style={styles.cardTitle}>{proj.name}</Text>
                                <Text style={{ marginBottom: 4 }}>{proj.description}</Text>
                                <Text style={{ fontSize: 8, color: '#64748b' }}>{proj.technologies.join(', ')}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Core Competencies</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {resume.skills.map((skill, i) => (
                                <Text key={i} style={styles.skillBadge}>{skill}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 6 }}>
                                <Text style={styles.cardTitle}>{edu.institution}</Text>
                                <Text style={styles.cardSubtitle}>{edu.degree}</Text>
                                <Text style={styles.cardDate}>{edu.endDate}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

        </Page>
    </Document>
);
