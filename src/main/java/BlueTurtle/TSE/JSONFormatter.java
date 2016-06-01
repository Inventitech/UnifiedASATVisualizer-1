package BlueTurtle.TSE;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import BlueTurtle.finders.ProjectInfoFinder;
import BlueTurtle.groupers.WarningGrouper;
import BlueTurtle.groupers.WarningGrouper.Criteria;
import BlueTurtle.parsers.CheckStyleXMLParser;
import BlueTurtle.parsers.FindBugsXMLParser;
import BlueTurtle.parsers.GDCParser;
import BlueTurtle.parsers.PMDXMLParser;
import BlueTurtle.parsers.XMLParser;
import BlueTurtle.summarizers.Summarizer;
import BlueTurtle.warnings.Warning;
import BlueTurtle.writers.JSWriter;

/**
 * JSONFormatter reads the output of Checkstyle, Findbugs and PMD and produces a
 * summarized defect output.
 * 
 * @author michiel
 *
 */
public class JSONFormatter {
	private XMLParser xmlParser;
	private GDCParser gdcParser = GDCParser.getInstance();
	private HashMap<String, String> categoryInfo = gdcParser.parseFile("./src/main/resources/asat-gdc-mapping.html");

	/**
	 * Produces a list of warnings for by reading the output of PMD, Checkstyle
	 * and Findbugs. Then converts it to JSON format and writes it to a
	 * JavaScript file.
	 * 
	 * @throws IOException
	 *             File not found.
	 */
	public void format() throws IOException {
		List<Warning> totalWarnings = new ArrayList<Warning>();
		totalWarnings.addAll(parseCheckStyleXML());
		totalWarnings.addAll(parsePMDXML());
		totalWarnings.addAll(parseFindBugsXML());
		new ProjectInfoFinder().findFiles(new File(JavaController.getUserDir()));
		writeJSON(totalWarnings);
	}

	/**
	 * Parse CheckStyle output and produce list of warnings.
	 * 
	 * @return List of warnings.
	 * @throws IOException
	 *             File not found.
	 */
	private List<Warning> parseCheckStyleXML() throws IOException {
		xmlParser = new CheckStyleXMLParser();
		return xmlParser.parseFile(JavaController.getCheckStyleOutputFile());
	}

	/**
	 * Parse PMD output and produce list of warnings.
	 * 
	 * @return List of warnings.
	 * @throws IOException
	 *             File not found.
	 */
	private List<Warning> parsePMDXML() throws IOException {
		xmlParser = new PMDXMLParser();
		return xmlParser.parseFile(JavaController.getPmdOutputFile());
	}

	/**
	 * Parse FindBugs output and produce list of warnings.
	 * 
	 * @return List of warnings.
	 * @throws IOException
	 *             File not found.
	 */
	private List<Warning> parseFindBugsXML() throws IOException {
		xmlParser = new FindBugsXMLParser();
		return xmlParser.parseFile(JavaController.getFindBugsOutputFile());
	}

	/**
	 * Groups the warnings together by packages and writes it as JSON output to
	 * a JavaScript file.
	 * 
	 * @param warnings
	 *            List of warnings to work with.
	 * @throws IOException
	 *             Output file not found.
	 */
	private void writeJSON(List<Warning> warnings) throws IOException {
		WarningGrouper wg = new WarningGrouper(warnings);
		List<Summarizer> list = wg.groupBy(Criteria.PACKAGES);

		JSWriter jwriter = JSWriter.getInstance();
		jwriter.setSummarizedWarnings(list);
		jwriter.writeToJSFormat("./src/main/resources/SummarizedOuput.js");
	}
}
