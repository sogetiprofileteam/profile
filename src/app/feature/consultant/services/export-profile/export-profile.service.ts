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

    const document = new Document();

    // Creates the header with the name
    document.addParagraph(this.createName(personal[0].firstName , personal[0].lastName));

    // Creates the contact info section
    document.addParagraph(this.createContactInfo(personal[0].phone,
                                                  'placehold for links',
                                                  personal[0].email,
                                                  personal[0].address,
                                                  personal[0].title,
                                                  personal[0].practice).spacing({ before: 0, after: 0, line: 360}));
                                                  // line is measured in 240ths of a line, so 360 = 1.5 lines

    // Creates the Core SKills section
    if (coreSkills.length) {
      document.addParagraph(this.createHeading('Core Skills'));
      document.addParagraph(this.createSkillList(coreSkills));
    }

    // Creates the technical skills section
    if (technicalSkills.length) {
      document.addParagraph(this.createHeading('Technical Skills'));
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
          this.createInstitutionHeader(position.companyName)
        );
        if (position.title !== 'null' && position.title != null) {
          document.addParagraph(this.createRoleText(position.title));
        }
        document.addParagraph(this.createPositionDateText(position.startDate, position.endDate));

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
  createName(firstName, lastName) {
    const paragraph = new Paragraph().title().center();
    const fullname = new TextRun(firstName + ' ' + lastName).font('Calibri (Body)');

    paragraph.addRun(fullname);
    return paragraph;
  }

  // TODO: FIX ADDRESS FORMATTING
  createContactInfo(phoneNumber, profileUrl, email, addressIn, title, practice) {
    const paragraph = new Paragraph().center();
    const titlePracticeRun = new TextRun(`${title} | ${practice} `).font('Calibri (Body)').break();
    const emailRun = new TextRun(`${email}`).font('Calibri (Body)').break();
    const links = new TextRun(`Links: ${profileUrl}`).font('Calibri (Body)').break();
    // const contactInfo = new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
    console.log('addressIn: ' + JSON.stringify(addressIn));

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
                                `| Phone: ${phoneNumber}`).font('Calibri (Body)').break();

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
    const tr = new TextRun(text).font('Calibri (Body)').bold();

    para.addRun(tr);
    return para;
  }

  createSubHeading(text) {
    return new Paragraph(text).heading2();
  }

  createInstitutionHeader(institutionName) {
    const paragraph = new Paragraph();
    const institution = new TextRun(institutionName).font('Calibri (Body)').bold();

    paragraph.addRun(institution).heading2();

    return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).font('Calibri (Body)');

    paragraph.addRun(role);

    return paragraph;
  }

  createBullet(text) {
    const para = new Paragraph();
    const tr = new TextRun(text).font('Calibri (Body)');

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
        skillRun = new TextRun(skill.name).font('Calibri (Body)').break();
      } else {
        skillRun = new TextRun(skill.name).font('Calibri (Body)').tab();
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
    const date = new TextRun(`${startDateText} - ${endDateText}`).font('Calibri (Body)');
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
