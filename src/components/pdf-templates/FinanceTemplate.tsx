
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Finance: Traditional, serif (Times-Roman equivalent), dense, very structured
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 10, lineHeight: 1.3 },
    header: { textAlign: 'center', marginBottom: 20 },
    name: { fontSize: 22, fontFamily: 'Times-Bold', textTransform: 'uppercase', marginBottom: 5 },
    contact: { fontSize: 9, color: '#333' },

    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 11, fontFamily: 'Times-Bold', textTransform: 'uppercase', borderBottom: '1px solid #000', marginBottom: 6, paddingBottom: 2 },

    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 2 },
    bold: { fontFamily: 'Times-Bold' },
    italic: { fontFamily: 'Times-Italic' },

    bullet: { textIndent: 10, marginLeft: 10 }
});

export const FinanceTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>
                    {resume.personalInfo.location} • {resume.personalInfo.phone} • {resume.personalInfo.email}
                </Text>
                {resume.personalInfo.linkedin && <Text style={styles.contact}>{resume.personalInfo.linkedin}</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{exp.company}</Text>
                            <Text style={styles.italic}>{exp.location || 'New York, NY'}</Text> {/* Fallback location */}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.italic}>{exp.position}</Text>
                            <Text>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={{ marginTop: 2 }}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{edu.school}</Text>
                            <Text>{edu.endDate}</Text>
                        </View>
                        <Text>{edu.degree}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Information</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.bold}>Skills: </Text>
                    <Text>{resume.skills.join(', ')}</Text>
                </View>
            </View>

        </Page>
    </Document>
);
