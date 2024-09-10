// MyDocument.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

interface DataItem {
  "Piller Name": string;
  Percentage: number;
  "Your Leval": string;
  "Selected Leval": string;
  "Action Name": string;
  "Assing Name": string;
  "Action Status": string;
  "Start Date": string;
  "End Date": string;
  "Document Link": string;
}

interface MyDocumentProps {
  data: DataItem[];
  companyName: string;
  assessmentData?: any;
  allassessmantData?: any;
  fetchClientmaturitylevel?: any;
  assessmentPercentage: number;
  completionDate: string;
}

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    // fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 15,
    border: 1,
    borderStyle: "solid",
    borderRadius: 6,
  },
  pillarSectionView: {
    flexDirection: 'row',
    width: "100%",
    borderRight: 1,
    marginBottom: 20,
  },
  pillarSection: {
    width: "33.33%",
    borderWidth: 1,
    borderRight: 0,
    borderStyle: "solid",
  },
  pillarSectionCard: {
    marginBottom: 10,
    borderRadius: 6,
    padding: 10,
  },
  companySection: {
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
  },
  item: {
    fontSize: 10,
    marginBottom: 2,
  },
  pillerItem: {
    fontSize: 10,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  mainSectionContent: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 90,
    textAlign: "center",
  },
  overallSection: {
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  overallContent: {
    fontSize: 10,
    marginBottom: 3,
  },
  overallLevelTitle: {
    padding: 4,
    borderRadius: 6,
    fontSize: 10,
  },
  table: {
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1
  },
  tablecol2: {
    width: '12%',
  },
  tableCell: {
    width: '100%',
    padding: 5,
    fontSize: 10,
  },
  heavyText: {
    fontWeight: "ultrabold"
  },
  tableCol: {
    width: '100%',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRight: 1
  },
  tableCol1: {
    width: '41%',
  },
  tableCol2: {
    width: '16%',
  },
  tableCol3: {
    width: '13%',
  },
});

// Create Document Component
const AssessmentPdf: React.FC<MyDocumentProps> = ({
  data,
  companyName,
  assessmentData,
  fetchClientmaturitylevel,
  assessmentPercentage,
  completionDate
}) => {
  const calculatePercentage = (
    totalPoints: string,
    totalMaxPoint: string
  ): string => {
    const points = parseFloat(totalPoints);
    const maxPoint = parseFloat(totalMaxPoint);
    if (maxPoint === 0) return "0%";
    const percentage = (points / maxPoint) * 100;
    return `${Math.round(percentage)}%`;
  };

  const findMaturityLevel = (score: number) => {
    for (const level of fetchClientmaturitylevel || []) {
      if (score >= level.rangeStart && score <= level.rangeEnd) {
        return level;
      }
    }
    return null;
  };

  const calculateTotalsAndLevel = (data: any) => {
    const levels = ["Introductory", "Intermediate", "Advanced"];
    let totalPoints = 0;
    let totalMaxPoints = 0;

    levels.forEach(level => {
      data[level].forEach((pillar: any) => {
        totalPoints += parseFloat(pillar.totalpoints);
        totalMaxPoints += parseFloat(pillar.totalmaxpoint);
      });
    });

    const overallPercentage = (totalPoints / totalMaxPoints) * 100;
    const maturity = findMaturityLevel(overallPercentage);

    return {
      totalPoints: `${totalPoints}/${totalMaxPoints}`,
      overallLevel: maturity ? maturity.maturityLevelName : "Unknown",
      color: maturity ? maturity.color : "#000000",
    };
  };

  const renderAssessmentSection = (title: string, pillars: any) => (
    <View style={styles.pillarSection}>
      <Text style={[styles.sectionTitle, { textAlign: "center", marginBottom: 10, paddingBottom: 10, paddingTop: 10, borderBottomWidth: 1, }]}>{title}</Text>
      {pillars.length === 0 ? (
        <Text style={styles.sectionContent}>---</Text>
      ) :
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          {
            pillars.map((item: any, index: number) => (
              <View key={index} style={{ ...styles.pillarSectionCard, backgroundColor: title === "Introductory" ? "#F63636" : title === "Intermediate" ? "#FFD56A" : "#64A70B" }}>
                <Text style={{ ...styles.item, color: title === "Introductory" ? "#FFFFFF" : title === "Intermediate" ? "#000000" : "#FFFFFF" }}>{item.pillarname}</Text>
                <Text style={{ ...styles.item, color: title === "Introductory" ? "#FFFFFF" : title === "Intermediate" ? "#000000" : "#FFFFFF" }}>
                  Percentage:{" "}
                  {calculatePercentage(item.totalpoints, item.totalmaxpoint)}
                </Text>
              </View>
            ))
          }
        </View>
      }
    </View>
  );
  const totalsAndLevel = assessmentData ? calculateTotalsAndLevel(assessmentData) : { totalPoints: "", overallLevel: "", color: "" };
  const overallLevelBGColor = totalsAndLevel.overallLevel === "Introductory" ? "#F63636" : totalsAndLevel.overallLevel === "Intermediate" ? "#FFD56A" : "#64A70B";
  const overallLevelTextColor = totalsAndLevel.overallLevel === "Introductory" ? "#FFFFFF" : totalsAndLevel.overallLevel === "Intermediate" ? "#000000" : "#FFFFFF";

  return (
    <Document>
      <Page style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "center", columnGap: 22 , marginBottom: 20}}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#63953B" }}>
            G O I N G
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#376513" }}>
            G R E E N
          </Text>
        </View>
        {companyName && (
          <View style={styles.companySection}>
            <Text style={styles.mainSectionContent}>{companyName}</Text>
          </View>
        )}
        <View style={styles.overallSection}>
          <Text style={styles.overallTitle}>Overall Assessment </Text>
          <View style={[styles.overallContent, { flexDirection: "row", marginTop: 2 }]}>
            <Text>Total Points : </Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>{totalsAndLevel.totalPoints}</Text>
          </View>
          <View style={[styles.overallContent, { flexDirection: "row", marginTop: 2 }]}>
            <Text>Your Overall Sustainability Assessment Percentage : </Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>{assessmentPercentage}%</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.overallContent}>Your Overall Sustainability Level : </Text>
            <View style={{ ...styles.overallLevelTitle, marginLeft: 3, color: overallLevelTextColor, backgroundColor: overallLevelBGColor }}>
              <Text>{totalsAndLevel.overallLevel}</Text>
            </View>
          </View>
          <View style={[styles.overallContent, { flexDirection: "row", marginTop: 2 }]}>
            <Text>Assesment completion date : </Text>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>{completionDate}</Text>
          </View>
        </View>
        {assessmentData && (
          <View style={styles.pillarSectionView}>
            {renderAssessmentSection(
              "Introductory",
              assessmentData.Introductory
            )}
            {renderAssessmentSection(
              "Intermediate",
              assessmentData.Intermediate
            )}
            {renderAssessmentSection("Advanced", assessmentData.Advanced)}
          </View>
        )}
        
        {data?.map((item: any, index) => (
          <View key={index} style={styles.section}>
            <View style={{ padding: 10, borderBottom: 1, flexDirection: "row", alignItems: "center", rowGap: 10 }}>
              <Text style={[styles.title, { marginBottom: 0 }]}>{item.pillarName}</Text>
            </View>

            <View style={[styles.table, { width: '100%' }]}>
              <View style={[styles.tableRow, { backgroundColor: "#ebebeb" }]}>
                <View style={[styles.tableCol, styles.tableCol1]} key={index}>
                  <Text style={[styles.tableCell, styles.heavyText]}>Action items</Text>
                </View>
                <View style={[styles.tableCol, styles.tableCol2]} key={index}>
                  <Text style={[styles.tableCell, styles.heavyText]}>Assignd to</Text>
                </View>
                <View style={[styles.tableCol, styles.tableCol3]} key={index}>
                  <Text style={[styles.tableCell, styles.heavyText]}>Status</Text>
                </View>
                <View style={[styles.tableCol, styles.tableCol3]} key={index}>
                  <Text style={[styles.tableCell, styles.heavyText]}>Start date</Text>
                </View>
                <View style={[styles.tableCol, styles.tableCol3, { borderRight: 0 }]} key={index}>
                  <Text style={[styles.tableCell, styles.heavyText]}>End date</Text>
                </View>
              </View>
              {
                item?.measures?.map((measuresItem: any, index: number) => (
                  <View style={[styles.tableRow, { borderBottom:  item?.measures?.length - 1 === index ? 0 : 1 }]}>
                    <View style={[styles.tableCol, styles.tableCol1]} key={index}>
                      <Text style={[styles.tableCell, styles.heavyText]}>{measuresItem?.measure || "-"}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableCol2]} key={index}>
                      <Text style={[styles.tableCell, styles.heavyText]}>{measuresItem?.employeeId?.name || measuresItem?.employeeId?.email?.split("@")[0] || "-"}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableCol3]} key={index}>
                      <Text style={[styles.tableCell, styles.heavyText]}>{measuresItem?.iscompleted === 1 ? "Completed" : "On time"}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableCol3]} key={index}>
                      <Text style={[styles.tableCell, styles.heavyText]}>{measuresItem?.startDate ? moment(measuresItem?.startDate).format("DD-MM-YYYY") : "-"}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableCol3, { borderRight: 0 }]} key={index}>
                      <Text style={[styles.tableCell, styles.heavyText]}>{measuresItem?.endDate ? moment(measuresItem?.endDate).format("DD-MM-YYYY") : "-"}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default AssessmentPdf;
