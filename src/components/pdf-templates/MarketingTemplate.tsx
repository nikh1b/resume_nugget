
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Marketing: Bright, energetic, distinct sections, emphasis on results
const styles = StyleSheet.create({
    page: { padding: 0, fontFamily: 'Helvetica', fontSize: 10, flexDirection: 'row' },
    sidebar: { width: '30%', backgroundColor: '#fcd34d', padding: 20, height: '100%' }, // Amber-300
    main: { width: '70%', padding: 30 },

    name: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#000', marginBottom: 5 },
    role: { fontSize: 14, color: '#444', marginBottom: 20, textTransform: 'uppercase' },

    sidebarSection: { marginBottom: 20 },
    sidebarTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 8, borderBottom: '2px solid #000', paddingBottom: 2 },

    contactItem: { marginBottom: 6, fontSize: 9 },

    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#d97706', marginBottom: 10, textTransform: 'uppercase' }, // Amber-600

    expBlock: { marginBottom: 15 },
    expTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold' },
    expMeta: { fontSize: 10, color: '#666', marginBottom: 4 },

    skillPill: { backgroundColor: '#fff', padding: '4 8', marginBottom: 4, borderRadius: 4, fontSize: 9, textAlign: 'center' }
});

export const MarketingTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Sidebar */}
            <View style={styles.sidebar}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.role}>Marketing Specialist</Text>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Contact</Text>
                    <Text style={styles.contactItem}>{resume.personalInfo.email}</Text>
                    <Text style={styles.contactItem}>{resume.personalInfo.phone}</Text>
                    <Text style={styles.contactItem}>{resume.personalInfo.address}</Text>
                    {resume.personalInfo.linkedin && <Text style={styles.contactItem}>in/ {resume.personalInfo.linkedin}</Text>}
                    {resume.personalInfo.website && <Text style={styles.contactItem}>{resume.personalInfo.website}</Text>}
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Skills</Text>
                    {resume.skills.map((skill, i) => (
                        <Text key={i} style={styles.skillPill}>{skill}</Text>
                    ))}
                </View>

                <View style={styles.sidebarSection}>
                    <Text style={styles.sidebarTitle}>Education</Text>
                    {resume.education.map((edu, i) => (
                        <View key={i} style={{ marginBottom: 8 }}>
                            <Text style={{ fontWeight: 'bold' }}>{edu.institution}</Text>
                            <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
                            <Text style={{ fontSize: 8 }}>{edu.endDate}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.main}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {resume.experience.map((exp, i) => (
                        <View key={i} style={styles.expBlock}>
                            <Text style={styles.expTitle}>{exp.position}</Text>
                            <Text style={styles.expMeta}>{exp.company} | {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                            <Text style={{ lineHeight: 1.4 }}>{exp.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Campaigns / Projects</Text>
                    {resume.projects.map((proj, i) => (
                        <View key={i} style={styles.expBlock}>
                            <Text style={styles.expTitle}>{proj.name}</Text>
                            <Text style={{ lineHeight: 1.4, marginBottom: 4 }}>{proj.description}</Text>
                            <Text style={{ fontSize: 9, color: '#d97706' }}>Focus: {proj.technologies.join(', ')}</Text>
                        </View>
                    ))}
                </View>
            </View>

        </Page>
    </Document>
);
