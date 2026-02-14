
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Consulting: Very structured, bullet-point focused, professional font, maximizing space
const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Times-Roman', fontSize: 10, color: '#000' },
    header: { marginBottom: 15, borderBottom: '1px solid #000', paddingBottom: 10 },
    name: { fontSize: 18, fontFamily: 'Times-Bold', textTransform: 'uppercase', textAlign: 'center' },
    contact: { fontSize: 9, textAlign: 'center', marginTop: 4 },

    section: { marginBottom: 12 },
    sectionTitle: { fontSize: 11, fontFamily: 'Times-Bold', textTransform: 'uppercase', borderBottom: '1px solid #ccc', marginBottom: 6 },

    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    bold: { fontFamily: 'Times-Bold' },
    italic: { fontFamily: 'Times-Italic' },

    bulletPoint: { flexDirection: 'row', marginBottom: 2 },
    bullet: { width: 10, textAlign: 'right', marginRight: 5 },
    content: { flex: 1 }
});

export const ConsultingTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>
                    {resume.personalInfo.address} | {resume.personalInfo.phone} | {resume.personalInfo.email}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 5 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{edu.institution}</Text>
                            <Text>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>{edu.degree}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{exp.company}</Text>
                            <Text>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={styles.italic}>{exp.position}</Text>

                        {/* Split description by newlines or bullets if possible, otherwise just text */}
                        <View style={{ marginTop: 2 }}>
                            <View style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.content}>{exp.description}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Leadership & Projects</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <Text style={styles.bold}>{proj.name}</Text>
                        <View style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.content}>{proj.description}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills & Interests</Text>
                <Text><Text style={styles.bold}>Skills:</Text> {resume.skills.join(', ')}</Text>
            </View>

        </Page>
    </Document>
);
