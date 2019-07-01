import { Document, Paragraph, Packer, TextRun, Table } from 'docx';

export class ExportProfile {

  create(personal, experiences, educations, coreSkills, technicalSkills, certifications) {

    // TODO: Remove this later
    console.log('INSIDE EXPORT PROFILE:\n' +
      // 'personal:' + JSON.stringify(personal[0]) +
       '\nexp: ' + JSON.stringify(experiences) +
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

    document.Header.addParagraph(this.createHeader());
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
    document.addParagraph(this.createSummaryText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
    ' incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
    'ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
    ' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));

    document.addParagraph(this.createHeading('Skills'));
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
    /* if (educations.length) {
      document.addParagraph(this.createHeading('Education'));
      for (const education of educations) {
        document.addParagraph(
          this.createInstitutionHeader(education.school, `${education.startDate} - ${education.endDate}`),
        );
        document.addParagraph(this.createRoleText(`${education.subject} - ${education.levelOfDegree}`));

        /* const bulletPoints = this.splitParagraphIntoBullets(education.notes);
        bulletPoints.forEach((bulletPoint) => {
          document.addParagraph(this.createBullet(bulletPoint));
        });
      }

      // TODO: Add code for certifications once we have data for it
      if (certifications.length) {
        document.addParagraph(this.createHeading('Certifications'));
      }
    } */

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
  createName(firstName, lastName) {
    const paragraph = new Paragraph().center();
    const fullname = new TextRun(firstName + ' ' + lastName).font('Calibri (Body)').bold().size(28);
    // font size measured in half-points so 28 = 14 pt font

    paragraph.addRun(fullname);
    return paragraph;
  }

  // TODO: FIX ADDRESS FORMATTING
  createContactInfo(phoneNumber, profileUrl, email, addressIn, title, practice) {
    const paragraph = new Paragraph().center();
    const titlePracticeRun = new TextRun(`${title} | ${practice} `).font('Calibri (Body)').bold().size(22);
    const emailRun = new TextRun(`${email}`).font('Calibri (Body)').break().size(22);
    const links = new TextRun(`${profileUrl}`).font('Calibri (Body)').break().size(22);
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
                                `| Phone: ${phoneNumber}`).font('Calibri (Body)').break().size(22);

    paragraph.addRun(titlePracticeRun);
    paragraph.addRun(emailRun);
    if (profileUrl.length) {
      paragraph.addRun(links);
    }
    paragraph.addRun(address);

    return paragraph;
  }

  createHeading(text) {
    const para =  new Paragraph().heading1().thematicBreak();
    const tr = new TextRun(text).font('Calibri (Body)').bold().color('0070AD').size(32);

    para.addRun(tr);
    return para;
  }

  createSubHeading(text) {
    const para =  new Paragraph();
    const tr = new TextRun(text).font('Calibri (Body)').bold().italics().color('12B3DB').size(28).tab();

    para.addRun(tr);
    return para;
  }

  createSummaryText(summary) {
    const paragraph = new Paragraph().maxRightTabStop();
    const text = new TextRun(summary).font('Calibri (Body)').size(22);

    paragraph.addRun(text);
    paragraph.addRun(new TextRun('').break());
    return paragraph;
  }

  createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).font('Calibri (Body)').bold().color('12B3DB').size(28);

    paragraph.addRun(institution);
    paragraph.addRun(dateText);

    return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).font('Calibri (Body)').bold().size(22);

    paragraph.addRun(role);

    return paragraph;
  }

  createBullet(text) {
    const para = new Paragraph();
    const tr = new TextRun(text).font('Calibri (Body)').size(22);

    para.addRun(tr).bullet();
    return para;
  }

  createSkillList(skills) {
    const paragraph = new Paragraph().maxRightTabStop();
    // const skillConcat = skills.map((skill) => skill.name).join(', ') + '.';
    let count = 0;
    for (const skill of skills) {
      console.log(JSON.stringify(skill.name));
      let skillRun;
      if (count % 2 === 0) {
        skillRun = new TextRun(skill.name).font('Calibri (Body)').break().size(22);
      } else {
        skillRun = new TextRun(skill.name).font('Calibri (Body)').tab().size(22);
      }
      count++;
      paragraph.addRun(skillRun);
    }
    paragraph.addRun(new TextRun('').break());
    return paragraph;
  }

  // TODO: I don't think this is needed anymore. Possibly remove later
  createAchivementsList(achivements) {
    const arr = [];

    for (const achievement of achivements) {
      arr.push(new Paragraph(achievement.name).bullet());
    }

    return arr;
  }

  splitParagraphIntoBullets(descriptions) {
    const arr = [];

    for (const desc of descriptions) {
      arr.push(desc);
    }
    return arr;
  }

  createPositionDateText(startDate, endDate) {
    const paragraph = new Paragraph();
    // const startDateText = this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const startdateString = startDate;
    const startDateText = new Date(startdateString).toLocaleDateString();

    // const endDateText = isCurrent ? 'Present' : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
    const enddateString = startDate;
    const endDateText = new Date(enddateString).toLocaleDateString();

    // console.log(`${startDateText} - ${endDateText}`);
    const date = new TextRun(`${startDateText} - ${endDateText}`).font('Calibri (Body)').tab().size(22);
    paragraph.addRun(date);

    return paragraph;
  }

  getMonthFromInt(value) {
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
