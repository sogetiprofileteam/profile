import { Document, Paragraph, Packer, TextRun, Media } from 'docx';
// import { readFileSync } from 'fs';
// import * as fs from 'fs';

export class ExportProfile {

  create(personal, experiences, educations, coreSkills, technicalSkills, certifications) {
    // const fs = require('fs');
    // TODO: Remove this later
    console.log('INSIDE EXPORT PROFILE:\n' +
      // 'personal:' + JSON.stringify(personal[0]) +
      // '\nexp: ' + JSON.stringify(experiences) +
      // '\nedu:' + JSON.stringify(educations) +
      // '\ncs: ' + JSON.stringify(coreSkills)  +
      // '\nts: ' + JSON.stringify(technicalSkills) +
       '\ncert' + JSON.stringify(certifications)
      );

    const document = new Document(undefined, {
                                      top: 1440,
                                      right: 720,
                                      bottom: 2880,
                                      left: 1080,
                                      width: 12240,
                                      height: 15840
                                  });
                                  // Margins are measured in 1440th's of an inch. So 2" = 2880, 8.5" = 12240
    // Logo still does not work, error with Buffer
    // const sogetiLogo = Media.addImage(document, fs.readFileSync('./../../../../../assets/img/sogeti_logo.png'));
    // const logoParagraph = new Paragraph().maxRightTabStop();
    // logoParagraph.addImage(sogetiLogo).tab();
    document.Header.addParagraph(this.createHeader());
    // document.Header.addParagraph(logoParagraph);
    document.Footer.addParagraph(this.createFooter());

    // Creates the header with the name
    document.addParagraph(this.createName(personal[0].firstName , personal[0].lastName));

    // Creates the contact info section
    document.addParagraph(this.createContactInfo(personal[0].phone,
                                                  'Sogeti Austin',
                                                  personal[0].email,
                                                  personal[0].address,
                                                  personal[0].title,
                                                  personal[0].practice).spacing({ before: 0, after: 0, line: 240}));
                                                  // line is measured in 240ths of a line, so 360 = 1.5 lines

    document.addParagraph(this.createHeading('Summary'));
    document.addParagraph(this.createSummaryText(personal[0].summary));

    if (coreSkills.length || technicalSkills.length) {
      document.addParagraph(this.createHeading('Skills'));
    }
    // Creates the Core Skills section
    if (coreSkills.length) {
      document.addParagraph(this.createSubHeading('Core Skills'));
      document.addParagraph(this.createSkillList(coreSkills));
    }

    // Creates the Technical Skills section
    if (technicalSkills.length) {
      document.addParagraph(this.createSubHeading('Technical Skills'));
      document.addParagraph(this.createSkillList(technicalSkills));
    }

    // TODO: Format for education and certification
    if (educations.length || certifications.length) {
      document.addParagraph(this.createHeading('Education & Certifications'));
      if ( educations.length) {
        for (const education of educations) {
          document.addParagraph(
            this.createInstitutionHeader(education.school.name, this.createEduCertDateText(education.endDate))
          );
          document.addParagraph(this.createRoleText(`${education.subject}`));
        }
      }
      if (certifications.length) {
        if (educations.length) { document.addParagraph(new Paragraph().addRun(new TextRun('').break())); }
        for (const certification of certifications) {
          document.addParagraph(
            this.createInstitutionHeader(certification.name, this.createEduCertDateText(certification.dateRecieved))
          );
          document.addParagraph(this.createRoleText(`${certification.title}`));
        }
      }
      document.addParagraph(new Paragraph().addRun(new TextRun('').break()));
    }

    // Creates the Experiences section
    if (experiences.length) {
      document.addParagraph(this.createHeading('Experience'));

      for (const position of experiences) {
        document.addParagraph(
          this.createInstitutionHeader(position.companyName, this.createPositionDateText(position.startDate, position.endDate))
        );
        if (position.title !== 'null' && position.title != null) {
          document.addParagraph(this.createRoleText(position.title));
        }

        const bulletPoints = this.splitParagraphIntoBullets(position.descriptions);
        // console.log(JSON.stringify(bulletPoints));
        bulletPoints.forEach((bulletPoint) => {
          // console.log('bulletpoint: ' + JSON.stringify(bulletPoint));
          document.addParagraph(this.createBullet(bulletPoint.summary).spacing({ before: 0, after: 120, line: 240}));
        });
        document.addParagraph(new Paragraph().addRun(new TextRun('').break()));
      }
    }

    return document;
  }

  // Start of methods that do things
  createHeader() {
    const paragraph = new Paragraph().left();
    const text = new TextRun('Consultant Profile').font('Candara').bold().size(40).color('0070AD');
    paragraph.addRun(text);
    return paragraph;
  }

  createFooter() {
    const paragraph = new Paragraph().left();
    const text = new TextRun('Confidential & Proprietary Information of Sogeti USA').size(20);
    paragraph.addRun(text);
    return paragraph;
  }

  // Creates the name
  createName(firstName: string, lastName: string) {
    const paragraph = new Paragraph().center();
    const fullname = new TextRun(firstName + ' ' + lastName).font('Calibri (Body)').bold().size(28);
    // font size measured in half-points so 28 = 14 pt font

    paragraph.addRun(fullname);
    return paragraph;
  }

  // TODO: FIX ADDRESS FORMATTING
  createContactInfo(phoneNumber: string, unitName: string, email: string, addressIn: any, title: string, practice: string) {
    const paragraph = new Paragraph().center();
    // const titlePracticeRun = new TextRun(`${title} | ${practice} `).font('Calibri (Body)').bold().size(22);
    // const emailRun = new TextRun(`${email}`).font('Calibri (Body)').break().size(22);
    const links = new TextRun(`${unitName}`).font('Calibri (Body)').size(24).bold();
    // const contactInfo = new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
    // console.log('addressIn: ' + JSON.stringify(addressIn));

    // the address needs to be broken out into its own class so that we can determine things like if line 2 exist
    let lineTwo = '';
    if (addressIn.lineTwo !== 'null' && addressIn.lineTwo != null) {
      lineTwo = ', ' + addressIn.lineTwo;
    }
    const address = new TextRun(addressIn.lineOne +
                                lineTwo + ', ' +
                                addressIn.city +  ', ' +
                                addressIn.state +  ', ' +
                                addressIn.zipCode +  ' ' +
                                `| Phone: ${phoneNumber}`).font('Calibri (Body)').break().size(24);

    // paragraph.addRun(titlePracticeRun);
    // paragraph.addRun(emailRun);
    if (unitName.length) {
      paragraph.addRun(links);
    }
    paragraph.addRun(address);

    return paragraph;
  }

  createHeading(text: string) {
    const para =  new Paragraph().heading1().thematicBreak();
    const tr = new TextRun(text).font('Calibri (Body)').bold().color('0070AD').size(36);

    para.addRun(tr);
    return para;
  }

  createSubHeading(text: string) {
    const para =  new Paragraph();
    const tr = new TextRun(text).font('Calibri (Body)').bold().italics().color('12B3DB').size(32);

    para.addRun(tr);
    return para;
  }

  createSummaryText(summary: string) {
    const paragraph = new Paragraph().maxRightTabStop();
    const text = new TextRun(summary).font('Calibri (Body)').size(24);

    paragraph.addRun(text);
    paragraph.addRun(new TextRun('').break());
    return paragraph;
  }

  createInstitutionHeader(institutionName: string, dateText: any) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).font('Calibri (Body)').bold().color('12B3DB').size(32);

    paragraph.addRun(institution);
    paragraph.addRun(dateText);

    return paragraph;
  }

  createRoleText(roleText: string) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).font('Calibri (Body)').bold().size(24);

    paragraph.addRun(role);

    return paragraph;
  }

  createBullet(text: string) {
    const para = new Paragraph();
    const tr = new TextRun(text).font('Calibri (Body)').size(24);

    para.addRun(tr).bullet();
    return para;
  }

  createSkillList(skills: any) {
    const paragraph = new Paragraph().leftTabStop(6000);
    // const skillConcat = skills.map((skill) => skill.name).join(', ') + '.';
    let count = 0;
    for (const skill of skills) {
      if (skill.displayOrder > 0) {
        // console.log(JSON.stringify(skill.name));
        let skillTextRun;
        if (count % 2 === 0) {
          skillTextRun = new TextRun('- ' + skill.name).font('Calibri (Body)').break().size(24);
        } else {
          skillTextRun = new TextRun('- ' + skill.name).font('Calibri (Body)').tab().size(24);
        }
        count++;
        paragraph.addRun(skillTextRun);
      }
    }

    paragraph.addRun(new TextRun('').break());
    return paragraph;
  }

  splitParagraphIntoBullets(descriptions: any) {
    const arr = [];

    for (const desc of descriptions) {
      arr.push(desc);
    }
    return arr;
  }

  createPositionDateText(startDate: string, endDate: string) {
    const paragraph = new Paragraph();
    // const startDateText = this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const startdateString = startDate;
    const startDateText = new Date(startdateString).toLocaleDateString();

    // const endDateText = isCurrent ? 'Present' : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
    let endDateText: any;
    if (endDate != null) {
      const enddateString = endDate;
      endDateText = new Date(enddateString).toLocaleDateString();
    } else {
      endDateText = 'Present';
    }

    // console.log(`${startDateText} - ${endDateText}`);
    const date = new TextRun(`${startDateText} - ${endDateText}`).font('Calibri (Body)').tab().size(24);
    paragraph.addRun(date);

    return paragraph;
  }

  createEduCertDateText(endDate: string) {
    const paragraph = new Paragraph().rightTabStop(10000);
    const enddateString = endDate;
    const endDateText = new Date(enddateString).toLocaleDateString();

    // console.log(`${startDateText} - ${endDateText}`);
    const date = new TextRun(`${endDateText}`).font('Calibri (Body)').tab().size(24);
    paragraph.addRun(date);

    return date;
  }

  getMonthFromInt(value: any) {
    switch (value) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sept';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
  }

}
