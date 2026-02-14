
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Pure: Absolute minimalism, zero distraction, lots of whitespace
const styles = StyleSheet.create({
    page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#000', lineHeight: 1.6 },
    header: { marginBottom: 40 },
    name: { fontSize: 20, fontFamily: 'Helvetica', letterSpacing: 1, marginBottom: 8 },
    contact: { fontSize: 9, color: '#666' },

    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 9, color: '#999', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 15 },

    block: { marginBottom: 20 },
    blockTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
    blockSubtitle: { fontSize: 10, color: '#444' },
});

export const PureTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.header}>
                <Text style={styles.name}>{resume.personalInfo.fullName}</Text>
                <Text style={styles.contact}>{resume.personalInfo.email}</Text>
                <Text style={styles.contact}>{resume.personalInfo.phone}</Text>
                <Text style={styles.contact}>{resume.personalInfo.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resume.experience.map((exp, i) => (
                    <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>{exp.company} — {exp.position}</Text>
                        <Text style={{ fontSize: 9, color: '#999', marginBottom: 5 }}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                        <Text>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resume.education.map((edu, i) => (
                    <View key={i} style={styles.block}>
                        <Text style={styles.blockTitle}>{edu.institution}</Text>
                        <Text style={styles.blockSubtitle}>{edu.degree}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Text>{resume.skills.join('  /  ')}</Text>
            </View>

        </Page>
    </Document>
);
