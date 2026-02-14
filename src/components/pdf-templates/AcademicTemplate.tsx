
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Academic: Conservative, detailed, education first, publications focus
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Times-Roman', fontSize: 10, lineHeight: 1.4 },
    header: { textAlign: 'center', marginBottom: 25 },
    name: { fontSize: 24, fontFamily: 'Times-Bold', marginBottom: 5 },
    contact: { fontSize: 10, marginBottom: 2 },

    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 12, fontFamily: 'Times-Bold', borderBottom: '1px solid #000', marginBottom: 8, textTransform: 'uppercase' },

    item: { marginBottom: 8 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between' },
    bold: { fontFamily: 'Times-Bold' },
    italic: { fontFamily: 'Times-Italic' }
});

export const AcademicTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>{resume.personalInfo.address}</Text>
                <Text style={styles.contact}>{resume.personalInfo.email} • {resume.personalInfo.phone}</Text>
                {resume.personalInfo.linkedin && <Text style={styles.contact}>{resume.personalInfo.linkedin}</Text>}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={styles.item}>
                        <View style={styles.headerRow}>
                            <Text style={styles.bold}>{edu.institution}</Text>
                            <Text>{edu.startDate} – {edu.endDate}</Text>
                        </View>
                        <Text style={styles.italic}>{edu.degree}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Research Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={styles.item}>
                        <View style={styles.headerRow}>
                            <Text style={styles.bold}>{exp.position}</Text>
                            <Text>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</Text>
                        </View>
                        <Text style={styles.italic}>{exp.company}</Text>
                        <Text>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects & Publications</Text>
                {resume.projects.map((proj, i) => (
                    <View key={i} style={styles.item}>
                        <Text style={styles.bold}>{proj.name}</Text>
                        <Text>{proj.description}</Text>
                        <Text style={styles.italic}>Technologies/Tools: {proj.technologies.join(', ')}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text>{resume.skills.join(', ')}</Text>
            </View>

        </Page>
    </Document>
);
