
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Student: Education first, skills emphasized, less focus on experience depth
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
    header: { textAlign: 'center', marginBottom: 20 },
    name: { fontSize: 24, fontFamily: 'Helvetica-Bold', marginBottom: 5, color: '#2563eb' }, // Blue-600
    contact: { fontSize: 9, color: '#666' },

    section: { marginBottom: 15 },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        borderBottom: '1px solid #2563eb',
        marginBottom: 8,
        paddingBottom: 2,
        color: '#2563eb',
        textTransform: 'uppercase'
    },

    educationBlock: { marginBottom: 8 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 2 },
    bold: { fontFamily: 'Helvetica-Bold' },

    skillList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    skillItem: { backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3 6', borderRadius: 4, fontSize: 8 }
});

export const StudentTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>
                    {resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.address}
                </Text>
                {resume.personalInfo.linkedin && <Text style={styles.contact}>{resume.personalInfo.linkedin}</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={styles.educationBlock}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{edu.institution}</Text>
                            <Text>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text>{edu.degree}</Text>
                        {/* Optional: Add GPA or relevant coursework if data existed */}
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillList}>
                    {resume.skills.map((skill, i) => (
                        <Text key={i} style={styles.skillItem}>{skill}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10 }}>{proj.name}</Text>
                        <Text style={{ fontSize: 9, marginBottom: 2 }}>{proj.description}</Text>
                        <Text style={{ fontSize: 8, color: '#666' }}>Built with: {proj.technologies.join(', ')}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{exp.position}</Text>
                            <Text style={{ fontSize: 9, color: '#666' }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={{ fontSize: 9, color: '#444' }}>{exp.company}</Text>
                        <Text style={{ marginTop: 2 }}>{exp.description}</Text>
                    </View>
                ))}
            </View>

        </Page>
    </Document>
);
