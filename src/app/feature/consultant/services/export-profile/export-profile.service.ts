import { Document, Paragraph, Packer, TextRun, Table } from 'docx';

const PROFILE_URL = 'https://www.linkedin.com/in/tylerjon93';


export class ExportProfile {

  create(personal, experiences, educations, coreSkills, technicalSkills, certifications) {

    console.log('INSIDE EXPORT PROFILE:\n' +
      // 'personal:' + JSON.stringify(personal[0]) +
       '\nexp: ' + JSON.stringify(experiences) +
      // '\nedu:' + JSON.stringify(educations) +
      // '\ncs: ' + JSON.stringify(coreSkills)  +
      // '\nts: ' + JSON.stringify(technicalSkills) +
       '\ncert' + JSON.stringify(certifications)
      );

    const document = new Document();

    // Add the header with the name
    document.addParagraph(this.createName(personal[0].firstName , personal[0].lastName));

    // Add the contact info section
    document.addParagraph(this.createContactInfo(personal[0].phone,
                                                  'placehold for links',
                                                  personal[0].email,
                                                  personal[0].address,
                                                  personal[0].title,
                                                  personal[0].practice));

    // Add the Core SKills section
    if (coreSkills.length) {
      document.addParagraph(this.createHeading('Core Skills'));
      document.addParagraph(this.createSkillList(coreSkills));
    }

    // Add the technical skills section
    if (technicalSkills.length) {
      document.addParagraph(this.createHeading('Technical Skills'));
      document.addParagraph(this.createSkillList(technicalSkills));
    }

    // TODO: Format for education and certification
    if (educations.length) {
      document.addParagraph(this.createHeading('Education'));
      for (const education of educations) {
        document.addParagraph(
          this.createInstitutionHeader(education.schoolName, `${education.startDate.year} - ${education.endDate.year}`),
        );
        document.addParagraph(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));

        const bulletPoints = this.splitParagraphIntoBullets(education.notes);
        bulletPoints.forEach((bulletPoint) => {
          document.addParagraph(this.createBullet(bulletPoint));
        });
      }

      if (certifications.length) {
        document.addParagraph(this.createHeading('Certifications'));
      }
    }

    // Add the experiences section
    if (experiences.length) {
      document.addParagraph(this.createHeading('Experience'));

      for (const position of experiences) {
        document.addParagraph(
          this.createInstitutionHeader(
            position.companyName,
            this.createPositionDateText(position.startDate, position.endDate, position.title),
          ),
        );
        document.addParagraph(this.createRoleText(position.title));

        const bulletPoints = this.splitParagraphIntoBullets(position.descriptions);
        console.log(JSON.stringify(bulletPoints));
        bulletPoints.forEach((bulletPoint) => {
          console.log('bulletpoint: ' + JSON.stringify(bulletPoint));
          document.addParagraph(this.createBullet(bulletPoint.summary));
        });
      }
    }

    // for (const achievementParagraph of this.createAchivementsList(technicalSkills)) {
    //   document.addParagraph(achievementParagraph);
    // }

    return document;
  }

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
    const tr = new TextRun(text).font('Calibri (Body)');

    para.addRun(tr);
    return para;
  }

  createSubHeading(text) {
    return new Paragraph(text).heading2();
  }

  createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).font('Calibri (Body)').bold();
    const date = new TextRun(dateText).font('Calibri (Body)').tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).font('Calibri (Body)').italics();

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
    let numberOfSkills = skills.length;
    for (const skill of skills) {
      console.log(JSON.stringify(skill.name));
      let skillRun;
      if (numberOfSkills % 2 !== 0) {
        skillRun = new TextRun(skill.name).font('Calibri (Body)').break();
      } else {
        skillRun = new TextRun(skill.name).font('Calibri (Body)').tab();
      }
      numberOfSkills--;
      paragraph.addRun(skillRun);
    }
    paragraph.addRun(new TextRun('').break());
    return paragraph;
  }

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

  createPositionDateText(startDate, endDate, isCurrent) {
    // const startDateText = this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const startdateString = startDate;
    const startDateText = new Date(startdateString).toLocaleDateString();

    // const endDateText = isCurrent ? 'Present' : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;
    const enddateString = startDate;
    const endDateText = new Date(enddateString).toLocaleDateString();

    // console.log(`${startDateText} - ${endDateText}`);
    return `${startDateText} - ${endDateText}`;
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
