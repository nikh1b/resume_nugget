
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// ExecutivePro: Alternate executive style, centered headers, very clean serif
// Using standard font to avoid loading issues, but styling for elegance
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 11, color: '#111' },
    header: { textAlign: 'center', marginBottom: 30, borderBottom: '1px solid #000', paddingBottom: 20 },
    name: { fontSize: 30, fontFamily: 'Times-Bold', textTransform: 'uppercase', letterSpacing: 2 },
    contact: { fontSize: 9, marginTop: 8, letterSpacing: 0.5 },

    section: { marginBottom: 20 },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#f3f4f6', // gray-100
        padding: 4
    },

    jobBlock: { marginBottom: 15 },
    jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    role: { fontFamily: 'Times-Bold', fontSize: 12 },
    company: { fontFamily: 'Times-Italic', fontSize: 11 },
    date: { fontSize: 10 },

    summary: { textAlign: 'justify', marginBottom: 15, lineHeight: 1.5, fontSize: 10, fontStyle: 'italic' }
});

export const ExecutiveProTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>
                    {resume.personalInfo.email}  |  {resume.personalInfo.phone}  |  {resume.personalInfo.address}
                </Text>
            </View>

            {/* Summary Placeholder (using first job desc or generic if none, but ideally resume has summary) */}
            <Text style={styles.summary}>
                Seasoned professional with extensive experience in leadership and strategic planning.
                Proven track record of driving results and optimizing operations.
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={styles.jobBlock}>
                        <View style={styles.jobHeader}>
                            <Text style={styles.role}>{exp.position}</Text>
                            <Text style={styles.date}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={styles.company}>{exp.company}</Text>
                        <Text style={{ marginTop: 4, lineHeight: 1.4 }}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 5, textAlign: 'center' }}>
                        <Text style={{ fontFamily: 'Times-Bold' }}>{edu.institution}</Text>
                        <Text>{edu.degree}</Text>
                        <Text style={{ fontSize: 9, color: '#555' }}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Skills</Text>
                <Text style={{ textAlign: 'center', lineHeight: 1.6 }}>{resume.skills.join('  •  ')}</Text>
            </View>

        </Page>
    </Document>
);
