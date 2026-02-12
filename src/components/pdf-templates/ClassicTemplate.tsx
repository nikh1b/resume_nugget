'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from '@/lib/types';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        fontSize: 11,
        color: '#000',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontFamily: 'Times-Bold',
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    contact: {
        fontSize: 10,
        marginBottom: 3,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 2,
        marginBottom: 10,
        marginTop: 15,
        textTransform: 'uppercase',
    },
    entry: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    italic: {
        fontFamily: 'Times-Italic',
    },
    desc: {
        fontSize: 10.5,
        lineHeight: 1.4,
        marginTop: 2,
    },
    skills: {
        fontSize: 10.5,
        lineHeight: 1.4,
    },
});

interface TemplateProps {
    resume: Resume;
}

export const ClassicTemplate = ({ resume }: TemplateProps) => {
    const { personalInfo, education, experience, skills, projects } = resume;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName}</Text>
                    <Text style={styles.contact}>
                        {[personalInfo.email, personalInfo.phone, personalInfo.address]
                            .filter(Boolean)
                            .join(' | ')}
                    </Text>
                    {personalInfo.linkedin && <Text style={styles.contact}>{personalInfo.linkedin}</Text>}
                </View>

                {personalInfo.summary && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.desc}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{exp.company}</Text>
                                    <Text>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                                </View>
                                <Text style={styles.italic}>{exp.position}</Text>
                                <Text style={styles.desc}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {education.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.entry}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{edu.institution}</Text>
                                    <Text>{edu.startDate} - {edu.endDate}</Text>
                                </View>
                                <Text style={styles.italic}>{edu.degree} in {edu.fieldOfStudy}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {skills.length > 0 && (
                    <View style={styles.entry}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <Text style={styles.skills}>{skills.join(' • ')}</Text>
                    </View>
                )}
            </Page>
        </Document>
    );
};
