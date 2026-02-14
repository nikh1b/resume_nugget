
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

// Bold: Heavy borders, large name display, strong visual impact
const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: 'Helvetica', fontSize: 10, color: '#000' },
    container: { border: '4px solid #000', height: '100%', padding: 20 },

    header: { borderBottom: '4px solid #000', paddingBottom: 15, marginBottom: 20 },
    name: { fontSize: 40, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', lineHeight: 0.9 },
    role: { fontSize: 14, fontFamily: 'Helvetica-Bold', backgroundColor: '#000', color: '#fff', padding: '4 8', alignSelf: 'flex-start', marginTop: 10 },

    contact: { fontSize: 9, marginTop: 10, fontFamily: 'Helvetica-Bold' },

    section: { marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', borderBottom: '2px solid #000', marginBottom: 8 },

    item: { marginBottom: 10 },
    itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Helvetica-Bold' },

    bold: { fontFamily: 'Helvetica-Bold', fontSize: 10 },

    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 5 },
    chip: { border: '1px solid #000', padding: '2 6', fontSize: 8, fontFamily: 'Helvetica-Bold' }
});

export const BoldTemplate = ({ resume }: { resume: Resume }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.name}>{resume.personalInfo.fullName.split(' ')[0]}</Text>
                    <Text style={styles.name}>{resume.personalInfo.fullName.split(' ').slice(1).join(' ')}</Text>
                    <Text style={styles.role}>PROFESSIONAL</Text>
                    <Text style={styles.contact}>
                        {resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.address}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {resume.experience.map((exp, i) => (
                        <View key={i} style={styles.item}>
                            <View style={styles.itemHeader}>
                                <Text>{exp.company} // {exp.position}</Text>
                                <Text>{exp.startDate} - {exp.current ? 'NOW' : exp.endDate}</Text>
                            </View>
                            <Text style={{ marginTop: 2 }}>{exp.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Log</Text>
                    {resume.projects.map((proj, i) => (
                        <View key={i} style={styles.item}>
                            <Text style={styles.bold}>{proj.name}</Text>
                            <Text>{proj.description}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Arsenal</Text>
                    <View style={styles.chips}>
                        {resume.skills.map((skill, i) => (
                            <Text key={i} style={styles.chip}>{skill}</Text>
                        ))}
                    </View>
                </View>

            </View>
        </Page>
    </Document>
);
